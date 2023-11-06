import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerReviewComponent } from './container/customer-review.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerReviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerReviewRoutingModule { }
