import { Message } from './message';
import { SignalRHubMethod } from '../enum/enums';

export class MessageHub {
  public message: Message;
  public type: SignalRHubMethod;

  constructor(message: Message, type: SignalRHubMethod) {
    this.message = message;
    this.type = type;
  }
}
