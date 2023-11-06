import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OurPartnersComponent } from './container/our-partners.component';

const routes: Routes = [
  {
    path: '',
    component: OurPartnersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurPartnersRoutingModule { }
