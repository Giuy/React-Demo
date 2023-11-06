import { Injectable } from '@angular/core';
import { User, UserManager, WebStorageStateStore } from 'oidc-client';
import { BehaviorSubject, concat, from, Observable, of } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  constructor() {}
  private userManager: UserManager;

  public isAuthenticated() {
    return !!localStorage.getItem('USERLOGGED');
  }

  public signIn(returnUrl) {
    this.initData();

    return this.userManager.signinRedirect({ state: returnUrl });
  }

  public initData() {
    if (this.userManager !== undefined) {
      return;
    }

    //const config = {
    //  authority: "https://vnrealty-identity-demo.grex-solutions.com",
    //  client_id: "interactive",
    //  client_secret: "49C1A7E1-0C79-4A89-A3D6-A37998FB86B0",
    //  redirect_uri: "https://vnrealty-admin-demo.grex-solutions.com/login-callback",
    //  response_type: "code",
    //  scope:"openid profile scope2 role",
    //  post_logout_redirect_uri : "https://vnrealty-admin-demo.grex-solutions.com/logout-callback",
    //  response_mode: "query"
    //};

    const config = {
      authority: environment.authority,
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      redirect_uri: environment.redirect_uri,
      response_type: 'code',
      scope: 'openid profile scope1 role',
      post_logout_redirect_uri: environment.post_logout_redirect_uri,
      response_mode: 'query',
    };

    this.userManager = new UserManager(config);
  }

  public async completeSignIn(url: string): Promise<User> {
    this.initData();
    try {
      const user = await this.userManager.signinRedirectCallback(url);
      localStorage.setItem('userName', user.profile.name);
      return user;
    } catch (error) {
      console.log('There was an error signing in: ', error);
      return null;
    }
  }

  public async completeSignOut(url: string) {
    this.initData();
    try {
      const response = await this.userManager.signoutCallback(url);
      return response;
    } catch (error) {
      console.log(`There was an error trying to log out '${error}'.`);
      return null;
    }
  }

  public getAccessToken() {
    this.initData();
    return from(this.userManager.getUser()).pipe(map((user) => user && user.access_token));
  }

  public signOut(returnUrl) {
    this.initData();
    this.userManager.signoutRedirect({ state: returnUrl });
  }
}
