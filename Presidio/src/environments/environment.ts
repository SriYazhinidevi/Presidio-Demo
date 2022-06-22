// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IonicAuthOptions } from '@ionic-enterprise/auth'

export const azureWebConfig : IonicAuthOptions = {
  // the auth provider
  authConfig: 'cognito',
  // The platform which we are running on
  platform: 'web',
  // client or application id for provider
  clientID: '2jjnoj7qqq0ddeqadh7660ui48',
  // the discovery url for the provider
  // OpenID configuration   
  //https://io-ionic-presidio-demo.auth.us-east-1.amazoncognito.com/login?client_id=6f7nc1a7ojtl7oauqs596ir3c&response_type=code&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=https://www.presidio.com/
  discoveryUrl: 'https://io-ionic-presidio-demo.auth.us-east-1.amazoncognito.com/login?client_id=2jjnoj7qqq0ddeqadh7660ui48&response_type=code&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=http://localhost:8100/home',
  // the URI to redirect to after log in
  redirectUri: 'http://localhost:8100/home',
  // requested scopes from provider
  scope: 'openid aws.cognito.signin.user.admin email',
  // the URL to redirect to after log out
  logoutUrl: 'http://localhost:8100/login',
  // Show provider login in either current window or new tab
  implicitLogin: "CURRENT",

  clientSecret: '1irotfgd6kv0skhnt9tclqvckln0q3lk92101tt8dpc0b9q1ulvi'
};



export const azureNativeConfig : IonicAuthOptions = {
  // the auth provider
  authConfig: 'cognito',
  // The platform which we are running on
  platform: 'capacitor',
  // client or application id for provider
  clientID: '2jjnoj7qqq0ddeqadh7660ui48',
  // the discovery url for the provider
  // OpenID configuration
  discoveryUrl: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_NxRAPmGX8/.well-known.openid-configuration',
  // the URI to redirect to after log in
  redirectUri: 'io.ionic.presidio.demo://login',
  // requested scopes from provider
  scope: 'openid offline_access email profile https://presidiodemo.onmicrosoft.com/presidiodemo/user_impersonation',
  // the URL to redirect to after log out
  logoutUrl: 'io.ionic.presidio.demo://login',
  // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
  // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
  // to confirm they want to share site data with the app. 'private' uses a webview which will not
  // prompt the user but will not be able to share session/cookie data either for true SSO across
  // multiple apps.
  iosWebView: 'private',

  clientSecret: '1irotfgd6kv0skhnt9tclqvckln0q3lk92101tt8dpc0b9q1ulvi'
};

// import { IonicAuthOptions } from '@ionic-enterprise/auth'

// export const azureWebConfig : IonicAuthOptions = {
//   // the auth provider
//   authConfig: 'azure',
//   // The platform which we are running on
//   platform: 'web',
//   // client or application id for provider
//   clientID: '776eac00-e0de-4bad-b36c-91d110eff4ff',
//   // the discovery url for the provider
//   // OpenID configuration
//   discoveryUrl: 'https://presidiodemo.b2clogin.com/presidiodemo.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_new-signin-signup-userflow',
//   // the URI to redirect to after log in
//   redirectUri: 'http://localhost:8100/login',
//   // requested scopes from provider
//   scope: 'openid offline_access email profile https://presidiodemo.onmicrosoft.com/presidiodemo/user_impersonation',
//   // the URL to redirect to after log out
//   logoutUrl: 'http://localhost:8100/login',
//   // Show provider login in either current window or new tab
//   implicitLogin: "CURRENT"
// };




// export const azureNativeConfig : IonicAuthOptions = {
//   // the auth provider
//   authConfig: 'azure',
//   // The platform which we are running on
//   platform: 'capacitor',
//   // client or application id for provider
//   clientID: '776eac00-e0de-4bad-b36c-91d110eff4ff',
//   // the discovery url for the provider
//   // OpenID configuration
//   discoveryUrl: 'https://presidiodemo.b2clogin.com/presidiodemo.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_new-signin-signup-userflow',
//   // the URI to redirect to after log in
//   redirectUri: 'io.ionic.presidio.demo://login',
//   // requested scopes from provider
//   scope: 'openid offline_access email profile https://presidiodemo.onmicrosoft.com/presidiodemo/user_impersonation',
//   // the URL to redirect to after log out
//   logoutUrl: 'io.ionic.presidio.demo://login',
//   // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
//   // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
//   // to confirm they want to share site data with the app. 'private' uses a webview which will not
//   // prompt the user but will not be able to share session/cookie data either for true SSO across
//   // multiple apps.
//   iosWebView: 'private'
// };

export const environment = {
  production: false,
  sso_api_username: '2jjnoj7qqq0ddeqadh7660ui48',
  sso_api_pwd: '1irotfgd6kv0skhnt9tclqvckln0q3lk92101tt8dpc0b9q1ulvi',

  loginURL: 'https://io-ionic-presidio-demo.auth.us-east-1.amazoncognito.com/login?client_id=2jjnoj7qqq0ddeqadh7660ui48&response_type=code&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=http://localhost:8100/callback',

  redirectURL: 'http://localhost:8100/callback',

  cognitoTokenURL: 'https://io-ionic-presidio-demo.auth.us-east-1.amazoncognito.com/oauth2/token',

  logout: 'https://io-ionic-presidio-demo.auth.us-east-1.amazoncognito.com/logout?client_id=2jjnoj7qqq0ddeqadh7660ui48&response_type=code&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=http://localhost:8100/login'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
