import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { LoginCallBackRoutingModule } from './login-callback-routing.module';
import { LoginCallBackComponent } from './container/login-callback.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginCallBackComponent],
  imports: [CommonModule, LoginCallBackRoutingModule, ReactiveFormsModule, FormsModule, SharedModule],
})
export class LoginCallBackModule {}
