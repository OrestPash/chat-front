import { SignalRService } from './../../../core/services/signalr.service';
import { MessageHub } from './../../../core/models/message-hub';
import { User } from './../../../core/models/user';
import { AuthService } from './../../../core/auth/auth.service';
import { Message } from './../../../core/models/message';
import { MessagesService } from './../../../core/services/messages.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalRHubMethod } from 'src/app/core/enum/enums';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public message: Message;
  public messages: Message[];
  public messageForm: FormGroup;
  public itemsPerPage = 10;
  public skip = 0;
  public users: User[];
  public isEdit = false;
  public idForEdit: number;
  public isLoadMore: boolean;

  constructor(private _messages: MessagesService,
              private _auth: AuthService,
              private _signalR: SignalRService) {

    this.messageForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      userId: new FormControl(''),
      userName: new FormControl(''),
    });

    this.getUsers();
    this.getAll(this.itemsPerPage, this.skip);
  }

  ngOnInit() {
    this._signalR.retrieveMappedObject().subscribe((receivedObj: MessageHub) => {
      switch (receivedObj.type) {
        case SignalRHubMethod.Create:
          this.messages.unshift(receivedObj.message);
          break;
        case SignalRHubMethod.Update:
          const message = this.messages.find(x => x.id === receivedObj.message.id);
          if (message) {
            message.text = receivedObj.message.text;
          }
          break;
        case SignalRHubMethod.Delete:
          const deletedMessage = this.messages.find(x => x.id === receivedObj.message.id);
          console.log();
          if (deletedMessage) {
            deletedMessage.isDeleted = receivedObj.message.isDeleted;
            deletedMessage.updatedAt = receivedObj.message.updatedAt;
          }
          break;
        default:
          break;
      }
    });
  }

  get formControls(): any {
    return this.messageForm.controls;
  }

  get userId(): string {
    return this._auth.userId;
  }

  get userName(): string {
    return this._auth.userName;
  }

  public getUsers(): void {
    this._auth.getUsers().subscribe(x => {
      this.users = x;
    });
  }

  public getAll(take: number, skip: number): void {
    this._messages.getAll(take, skip).subscribe(x => {
      this.messages = x;
      this.isLoadMore = x.length >= this.itemsPerPage;
    });
  }

  public create(): void {
    if (!this.messageForm.invalid) {
      this.messageForm.get('userId').patchValue(this.userId);
      this.messageForm.get('userName').patchValue(this._auth.userName);

      this._messages.create(this.messageForm.value).subscribe(x => {
        this.messageForm.get('text').setValue('');
        this.messageForm.get('text').markAsUntouched();
      });
    } else {
      this.validateForm();
    }
  }

  public edit(id: number, text: string): void {
    this.isEdit = true;
    this.messageForm.controls.text.setValue(text);
    this.idForEdit = id;
  }

  public update(): void {
    this._messages.update(this.idForEdit, { text: this.messageForm.controls.text.value }).subscribe(x => {
      this.messageForm.controls.text.setValue('');
      this.messageForm.get('text').markAsUntouched();
      this.isEdit = false;
    });
  }

  public delete(id: number): void {
    this._messages.delete(id).subscribe();
  }

  public showMore(): void {
    if (this.isLoadMore) {
      this.skip += this.itemsPerPage;
      this._messages.getAll(this.itemsPerPage, this.skip).subscribe(m => {
        if (m && m.length > 0) {
          this.messages = this.messages.concat(m);
        } else {
          this.isLoadMore = false;
        }
      });
    }
  }

  public validateForm(): void {
    Object.keys(this.messageForm.controls).forEach(key => {
      this.messageForm.controls[key].markAsTouched();
    });
  }
}
