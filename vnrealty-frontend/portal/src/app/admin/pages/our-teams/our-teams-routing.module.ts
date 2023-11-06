import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OurTeamsComponent } from './container/our-teams.component';

const routes: Routes = [
  {
    path: '',
    component: OurTeamsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurTeamsRoutingModule { }
