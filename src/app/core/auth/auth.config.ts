import { environment } from '../../../environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc';

export const authPasswordFlowConfig: AuthConfig = {
  issuer: environment.authUrl,
  tokenEndpoint: `${environment.authUrl}/connect/token`,
  userinfoEndpoint: `${environment.authUrl}/connect/userinfo`,
  revocationEndpoint: `${environment.authUrl}/connect/revocation`,
  requireHttps: false,
  logoutUrl: `${window.location.origin}/login`,
  clientId: 'login',
  scope: 'openid profile email api',
  showDebugInformation: true,
  oidc: false
};
