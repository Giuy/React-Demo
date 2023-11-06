import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerReviewRoutingModule } from './customer-review-routing.module';
import { CustomerReviewComponent } from './container/customer-review.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [CustomerReviewComponent],
  imports: [CommonModule, CustomerReviewRoutingModule, SharedModule],
  exports: [CustomerReviewComponent],
})
export class CustomerReviewModule {}
