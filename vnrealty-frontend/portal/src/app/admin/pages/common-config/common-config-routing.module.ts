import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonConfigComponent } from './container/common-config.component';

const routes: Routes = [
  {
    path: '',
    component: CommonConfigComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonConfigRoutingModule { }
