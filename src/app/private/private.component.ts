import { AuthService } from './../core/auth/auth.service';
import { Component } from '@angular/core';
import { SignalRService } from '../core/services/signalr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html'
})
export class PrivateComponent {

  constructor(private _signalR: SignalRService,
              private _auth: AuthService,
              private _router: Router) {
    this._signalR.startConnection();
    this._signalR.onCreatedListener();
    this._signalR.onUpdatedListener();
    this._signalR.onDeletedListener();
  }

  public logout(): void {
    this._auth.logout().subscribe(() => this._router.navigate(['/login']));
  }
}
