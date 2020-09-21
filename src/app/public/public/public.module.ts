import { LoginModule } from './../pages/login/login.module';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SignupModule } from '../pages/signup/signup.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    LoginModule,
    SignupModule
  ],
  declarations: [
    PublicComponent
  ]
})

export class PublicModule {}
