import type {IAuthenticateGeneric,ICredentialType,ICredentialTestRequest,INodeProperties,Icon} from 'n8n-workflow';

export class ResultaryApi implements ICredentialType {
  name='resultaryApi';
  displayName='Resultary API';
  icon:Icon={light:'file:../nodes/Resultary/resultary.svg',dark:'file:../nodes/Resultary/resultary.dark.svg'};
  documentationUrl='https://getresultary.com/n8n/';
  properties:INodeProperties[]=[
    {
      displayName:'Private Integration API Key',name:'apiToken',
      type:'string',typeOptions:{password:true},default:'',required:true,
      description:'One-time API key issued by the approved private Resultary invitation flow, never the independent destination read credential',
    },
  ];
  test:ICredentialTestRequest={
    request:{baseURL:'https://api.getresultary.com',url:'/v1/integration',method:'GET',
      disableFollowRedirect:true,
      sendCredentialsOnCrossOriginRedirect:false,
      allowedDomains:'api.getresultary.com'},
  };
  authenticate:IAuthenticateGeneric={
    type:'generic',properties:{
      headers:{Authorization:'=Bearer {{$credentials.apiToken}}'},
    },
  };
}
