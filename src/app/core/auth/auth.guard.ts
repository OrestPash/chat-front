import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, of, from } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private _oauth: OAuthService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    if (this._oauth.hasValidAccessToken()) {
      return true;
    } else {
      return this._logOut();
    }
  }

  private _logOut(): Observable<boolean> {
    return of(false).pipe(
      finalize(() => this.router.navigate(['/login'])),
      finalize(() => localStorage.clear()),
    );
  }
}
