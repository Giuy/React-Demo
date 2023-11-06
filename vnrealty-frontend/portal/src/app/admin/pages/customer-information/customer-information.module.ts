import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInformationRoutingModule } from './customer-information-routing.module';
import { CustomerInformationComponent } from './container/customer-information.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [CustomerInformationComponent],
  imports: [CommonModule, CustomerInformationRoutingModule, SharedModule],
  exports: [CustomerInformationComponent],
})
export class CustomerInformationModule {}
