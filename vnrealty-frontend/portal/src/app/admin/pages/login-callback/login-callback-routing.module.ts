import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginCallBackComponent } from './container/login-callback.component';

const routes: Routes = [
  {
    path: '',
    component: LoginCallBackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginCallBackRoutingModule {}
