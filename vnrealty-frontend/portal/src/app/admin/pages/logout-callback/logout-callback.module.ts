import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { LogoutCallBackRoutingModule } from './logout-callback-routing.module';
import { LogoutCallBackComponent } from './container/logout-callback.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LogoutCallBackComponent],
  imports: [CommonModule, LogoutCallBackRoutingModule, ReactiveFormsModule, FormsModule, SharedModule],
})
export class LogoutCallBackModule {}
