import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class ResultaryOAuth2Api implements ICredentialType {
  name = 'resultaryOAuth2Api';
  extends = ['oAuth2Api'];
  displayName = 'Resultary OAuth2 API';
  icon: Icon = { light: 'file:../nodes/Resultary/resultary.svg', dark: 'file:../nodes/Resultary/resultary.dark.svg' };
  documentationUrl = 'https://getresultary.com/n8n/';

  properties: INodeProperties[] = [
    {
      displayName: 'Grant Type',
      name: 'grantType',
      type: 'hidden',
      default: 'pkce',
    },
    {
      displayName: 'Authorization URL',
      name: 'authUrl',
      type: 'hidden',
      default: 'https://api.getresultary.com/oauth/authorize',
      required: true,
    },
    {
      displayName: 'Access Token URL',
      name: 'accessTokenUrl',
      type: 'hidden',
      default: 'https://api.getresultary.com/oauth/token',
      required: true,
    },
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'hidden',
      default: 'resultary-n8n',
      required: true,
    },
    {
      displayName: 'Client Secret',
      name: 'clientSecret',
      type: 'hidden',
      typeOptions: { password: true },
      default: 'resultary-public-pkce',
      required: true,
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'hidden',
      default: 'resultary:n8n',
    },
    {
      displayName: 'Auth URI Query Parameters',
      name: 'authQueryParameters',
      type: 'hidden',
      default: '',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'body',
    },
  ];
}
