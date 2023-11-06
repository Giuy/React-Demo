import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactCustomerComponent } from './container/contact-customer.component';

const routes: Routes = [
  {
    path: '',
    component: ContactCustomerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactCustomerRoutingModule { }
