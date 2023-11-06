import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactCustomerRoutingModule } from './contact-customer-routing.module';
import { ContactCustomerComponent } from './container/contact-customer.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [ContactCustomerComponent],
  imports: [CommonModule, ContactCustomerRoutingModule, SharedModule],
  exports: [ContactCustomerComponent],
})
export class ContactCustomerModule {}
