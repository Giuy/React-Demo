import { DetailPropertyComponent } from './detail-property/detail-property.component';
import { LeasingPropertyComponent } from './leasing-property/leasing-property.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyComponent } from './container/property.component';

const routes: Routes = [
  {
    path: 'property-portal',
    component: PropertyComponent,
  },
  {
    path: 'leasing',
    component: LeasingPropertyComponent,
  },
  {
    path: 'detail/:id',
    component: DetailPropertyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
