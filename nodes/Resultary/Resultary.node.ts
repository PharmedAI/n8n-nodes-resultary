import type {
  IExecuteFunctions,INodeExecutionData,INodeType,INodeTypeDescription,
} from 'n8n-workflow';
import {ApplicationError,NodeConnectionTypes,NodeOperationError} from 'n8n-workflow';

const ID=/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
// Published connector must NEVER send its bearer token to an arbitrary URL.
// This is the fixed product-owned API hostname; customers cannot override it.
const RESULTARY_API_ORIGIN='https://api.getresultary.com';

function safeId(value:unknown,name:string):string {
  if(typeof value!=='string'||!ID.test(value)){
    throw new ApplicationError(name+' must contain 1–128 letters, numbers, underscores or hyphens');
  }
  return value;
}

/**
 * Private preview: thin n8n client for a SINGLE service, Resultary.
 * Sending a run signal is never accepted as proof of downstream business
 * success. Independently approved destination evidence stays server-side.
 */
export class Resultary implements INodeType {
  description:INodeTypeDescription={
    displayName:'Resultary',
    name:'resultary',
    icon:{light:'file:resultary.svg',dark:'file:resultary.dark.svg'},
    group:['transform'],
    version:1,
    subtitle:'={{$parameter["operation"]}}',
    description:'Report n8n runs and read independently checked Resultary status',
    defaults:{name:'Resultary'},
    inputs:[NodeConnectionTypes.Main],
    outputs:[NodeConnectionTypes.Main],
    usableAsTool:true,
    credentials:[{name:'resultaryOAuth2Api',required:true}],
    properties:[
      {
        displayName:'Operation',name:'operation',type:'options',
        options:[
          {name:'Report Run',value:'report',description:'Tell Resultary this execution started; does not prove business success',action:'Report a run'},
          {name:'Get Result',value:'status',description:'Read independently checked status of a previously reported run',action:'Get run result'},
          {name:'Check Connection',value:'connection',description:'Verify this approved integration key is accepted by Resultary',action:'Check connection'},
        ],
        default:'report',noDataExpression:true,
      },
      {
        displayName:'Run ID',name:'runId',type:'string',default:'',
        required:true,description:'The runId previously returned by Resultary',
        displayOptions:{show:{operation:['status']}},
      },
    ],
  };

  async execute(this:IExecuteFunctions):Promise<INodeExecutionData[][]> {
    const input=this.getInputData();
    const result:INodeExecutionData[]=[];
    // n8n stores the Resultary OAuth token in its credential manager; this code never logs or returns it.
    const origin=RESULTARY_API_ORIGIN;
    for(let itemIndex=0;itemIndex<input.length;itemIndex++){
      try{
        const operation=this.getNodeParameter('operation',itemIndex) as string;
        let method:'GET'|'POST'='GET';
        let path='/v1/integration';
        let body:Record<string,string>|undefined;
        if(operation==='report'){
          // Community-node lint requires normal nodes to be usable as AI tools.
          // A tool call must never be able to manufacture a transport signal,
          // so Report Run is deliberately unavailable in AI-tool execution.
          if(this.isToolExecution()){
            throw new ApplicationError('Report Run is unavailable when Resultary is used as an AI tool');
          }
          method='POST';path='/v1/runs';
          // Bind the signal to n8n's trusted execution context. Users and AI
          // cannot override either identifier through editable node fields.
          body={
            executionId:safeId(this.getExecutionId(),'Execution ID'),
            workflowId:safeId(this.getWorkflow().id,'Workflow ID'),
          };
        }else if(operation==='status'){
          path='/v1/runs/'+safeId(this.getNodeParameter('runId',itemIndex),'Run ID');
        }else if(operation!=='connection'){
          throw new ApplicationError('Unsupported Resultary operation');
        }
        const response=await this.helpers.httpRequestWithAuthentication.call(
          this,'resultaryOAuth2Api',{
            method,url:origin+path,
            ...(body?{body}:{}),
            json:true,timeout:10000,
            // n8n follows redirects with bearer credentials unless explicitly blocked.
            disableFollowRedirect:true,
            sendCredentialsOnCrossOriginRedirect:false,
            allowedDomains:'api.getresultary.com',
          }
        );
        result.push({
          json:response as INodeExecutionData['json'],
          pairedItem:{item:itemIndex},
        });
      }catch(error){
        if(this.continueOnFail()){
          result.push({
            json:{error:'Resultary request failed; see execution error for details'},
            pairedItem:{item:itemIndex},
          });
          continue;
        }
        // Error is surfaced through n8n, not arbitrary HTML or telemetry.
        throw new NodeOperationError(this.getNode(),error as Error,{itemIndex});
      }
    }
    return [result];
  }
}
