import { authPasswordFlowConfig } from './auth.config';
import { AuthIdentityClaims } from './../models/user-info';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { LogInModel, SignUpModel } from './auth.model';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthService {
  public get apiUrl(): string { return environment.apiUrl; }

  public get claims(): AuthIdentityClaims { return new AuthIdentityClaims(this.oauthService.getIdentityClaims()); }
  public get userId(): string { return this.claims.sub; }
  public get userName(): string { return this.claims.preferred_username; }

  constructor(private http: HttpClient, private oauthService: OAuthService) {
    this.configureOAuth();
  }

  public login(model: LogInModel): Observable<any> {
    return from(this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(model.userName, model.password));
  }

  public logout(): Observable<any> {
    return from(this.oauthService.revokeTokenAndLogout());
  }

  public signUp(model: SignUpModel): Observable<any> {
    return this.http.post(`${this.oauthService.issuer}/api/v1/auth/signup`, model);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.oauthService.issuer}/api/v1/auth/users`);
  }

  private configureOAuth(): void {
    this.oauthService.configure(authPasswordFlowConfig);
    this.oauthService.setStorage(localStorage);
  }
}
