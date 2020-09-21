import { environment } from './../../../environments/environment';
import { MessageHub } from '../models/message-hub';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IHttpConnectionOptions } from '@microsoft/signalr';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { SignalRHubMethod } from '../enum/enums';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private receivedMessageObject: Message = new Message();
  private sharedObj = new Subject<MessageHub>();

  constructor(private _oauth: OAuthService) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.chatHub, this._connectionOptions())
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public onCreatedListener = () => {
    this.hubConnection.on('CreateOne', (message) => {
      this.mapReceivedMessage(message, SignalRHubMethod.Create);
    });
  }

  public onUpdatedListener = () => {
    this.hubConnection.on('UpdateOne', (message) => {
      this.mapReceivedMessage(message, SignalRHubMethod.Update);
    });
  }

  public onDeletedListener = () => {
    this.hubConnection.on('DeleteOne', (message) => {
      this.mapReceivedMessage(message, SignalRHubMethod.Delete);
    });
  }

  private _connectionOptions(): IHttpConnectionOptions {
    return {
      accessTokenFactory: () => this._oauth.getAccessToken()
    } as IHttpConnectionOptions;
  }

  private mapReceivedMessage(message: any, type: SignalRHubMethod): void {
    this.receivedMessageObject = message;
    this.sharedObj.next(new MessageHub(this.receivedMessageObject, type));
  }

  public retrieveMappedObject(): Observable<MessageHub> {
    return this.sharedObj.asObservable();
  }
}
