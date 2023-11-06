import { GeneralClient, CreateCustomerReviewDto,CustomerReviewDto  } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerReviewService {
  constructor(private client: GeneralClient) {}

  getAllCustomerReview() : Observable<CustomerReviewDto[]> {
    return this.client.apiCustomerreviewGetall();
  }

  addCustomerReview(newsCategory: CreateCustomerReviewDto) {
    return this.client.apiCustomerreviewCreate(newsCategory);
  }

  editCustomerReview(id: string, newsCategory: CreateCustomerReviewDto) {
    return this.client.apiCustomerreviewUpdate(id, newsCategory);
  }

  deleteCustomerReview(id: string) {
    return this.client.apiCustomerreviewDelete(id);
  }
}
