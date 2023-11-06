import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OurServicesComponent } from './container/our-services.component';

const routes: Routes = [
  {
    path: '',
    component: OurServicesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurServicesRoutingModule { }
