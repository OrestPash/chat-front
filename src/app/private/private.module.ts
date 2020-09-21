import { PrivateRoutingModule } from './private-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrivateComponent } from './private.component';
import { ChatModule } from './pages/chat/chat.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    PrivateRoutingModule,
    ChatModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    PrivateComponent
  ]
})

export class PrivateModule {}
