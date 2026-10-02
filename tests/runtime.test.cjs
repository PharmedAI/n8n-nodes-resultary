'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {Resultary}=require('../dist/nodes/Resultary/Resultary.node.js');
const {ResultaryOAuth2Api}=require('../dist/credentials/ResultaryOAuth2Api.credentials.js');

function context({op='report',input=[{json:{test:1}}],params={},reply={runId:'r123',status:'pending'},error=null,continueOnFail=false,tool=false,executionId='exe123',workflowId='work123'}={}){
  const calls=[];
  const data={
    getInputData:()=>input,
    getCredentials:async name=>{
      assert.equal(name,'resultaryOAuth2Api');
      return {};
    },
    getNodeParameter:(name,index)=>{
      if(name==='operation')return op;
      if(name==='runId')return params.runId??'r123';
      throw Error('unexpected parameter '+name+' '+index);
    },
    helpers:{
      httpRequestWithAuthentication:async(name,request)=>{
        assert.equal(name,'resultaryOAuth2Api');
        calls.push(request);
        if(error)throw error;
        return reply;
      },
    },
    continueOnFail:()=>continueOnFail,
    isToolExecution:()=>tool,
    getExecutionId:()=>executionId,
    getWorkflow:()=>({id:workflowId,name:'Test workflow',active:false}),
    getNode:()=>({name:'Resultary',type:'n8n-nodes-resultary.resultary',typeVersion:1,position:[0,0],parameters:{}}),
  };
  return {data,calls};
}
test('report binds signal IDs to trusted n8n execution context',async()=>{
  const {data,calls}=context();
  const output=await new Resultary().execute.call(data);
  assert.equal(calls.length,1);
  assert.equal(calls[0].method,'POST');
  assert.equal(calls[0].disableFollowRedirect,true);
  assert.equal(calls[0].sendCredentialsOnCrossOriginRedirect,false);
  assert.equal(calls[0].allowedDomains,'api.getresultary.com');
  assert.equal(calls[0].url,'https://api.getresultary.com/v1/runs');
  assert.deepEqual(calls[0].body,{executionId:'exe123',workflowId:'work123'});
  assert.deepEqual(output,[[{json:{runId:'r123',status:'pending'},pairedItem:{item:0}}]]);
});
test('AI-tool execution is read-only: it cannot report a synthetic run',async()=>{
  const c=context({op:'report',tool:true});
  await assert.rejects(()=>new Resultary().execute.call(c.data),/AI tool/);
  assert.equal(c.calls.length,0);
});
test('report rejects missing or unsafe trusted execution metadata before network use',async()=>{
  for(const c of [
    context({executionId:'../../fake'}),
    context({workflowId:'bad/workflow'}),
    context({workflowId:null}),
  ]){
    await assert.rejects(()=>new Resultary().execute.call(c.data));
    assert.equal(c.calls.length,0);
  }
});
test('status and connection match backend contract exactly',async()=>{
  const status=context({op:'status',params:{runId:'run_2'},reply:{status:'healthy'}});
  assert.equal((await new Resultary().execute.call(status.data))[0][0].json.status,'healthy');
  assert.equal(status.calls[0].url,'https://api.getresultary.com/v1/runs/run_2');
  assert.equal(status.calls[0].method,'GET');
  const connection=context({op:'connection',reply:{platform:'n8n',integrationId:'approved1'}});
  assert.equal((await new Resultary().execute.call(connection.data))[0][0].json.integrationId,'approved1');
  assert.equal(connection.calls[0].url,'https://api.getresultary.com/v1/integration');
});
test('report preserves one-to-one paired items for multiple inputs',async()=>{
  const c=context({input:[{json:{x:1}},{json:{x:2}}]});
  const output=await new Resultary().execute.call(c.data);
  assert.equal(c.calls.length,2);
  assert.deepEqual(output[0].map(x=>x.pairedItem),[{item:0},{item:1}]);
});
test('fail-closed bad operation and unsafe run ID',async()=>{
  for(const c of [
    context({op:'delete'}),
    context({op:'status',params:{runId:'../../admin'}}),
  ]){
    await assert.rejects(()=>new Resultary().execute.call(c.data));
    assert.equal(c.calls.length,0);
  }
});
test('continue-on-fail masks server details and preserves input pairing',async()=>{
  const c=context({error:new Error('backend-message'),continueOnFail:true});
  const output=await new Resultary().execute.call(c.data);
  assert.deepEqual(output[0][0].pairedItem,{item:0});
  assert.doesNotMatch(JSON.stringify(output),/backend-message/);
});
test('OAuth credential is fixed to Resultary PKCE endpoints',()=>{
  const c=new ResultaryOAuth2Api();
  const byName=name=>c.properties.find(p=>p.name===name);
  assert.deepEqual(c.extends,['oAuth2Api']);
  assert.equal(byName('grantType').default,'pkce');
  assert.equal(byName('authUrl').default,'https://api.getresultary.com/oauth/authorize');
  assert.equal(byName('accessTokenUrl').default,'https://api.getresultary.com/oauth/token');
  assert.equal(byName('clientId').default,'resultary-n8n');
  assert.equal(byName('clientId').type,'hidden');
  assert.equal(byName('clientSecret').default,'resultary-public-pkce');
  assert.equal(byName('clientSecret').type,'hidden');
  assert.equal(byName('scope').default,'resultary:n8n');
  assert.ok(!c.properties.some(p=>p.name==='baseUrl'||p.name==='apiToken'));
});
