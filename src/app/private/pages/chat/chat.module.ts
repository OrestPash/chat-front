import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: ChatComponent}])
  ],
  declarations: [
    ChatComponent
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {}
