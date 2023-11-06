// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  
  //baseUrl: 'https://vnrealty-admin-demo.grex-solutions.com',
  //authority: 'https://vnrealty-identity-portal.grex-solutions.com',
  //client_id: 'PortalClient',
  //client_secret: 'E8C63C76-9FCD-4A34-A1E3-47C60533D3C7',
  //redirect_uri: 'http://localhost:4200/login-callback',
  //post_logout_redirect_uri: 'http://localhost:4200/logout-callback'
  
  baseUrl: 'https://localhost:4002',
  authority: 'https://localhost:4003',
  client_id: 'PortalClient',
  client_secret: 'E8C63C76-9FCD-4A34-A1E3-47C60533D3C7',
  redirect_uri: 'http://localhost:4201/login-callback',
  post_logout_redirect_uri: 'http://localhost:4201/logout-callback'

};
