import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutCallBackComponent } from './container/logout-callback.component';

const routes: Routes = [
  {
    path: '',
    component: LogoutCallBackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutCallBackRoutingModule {}
