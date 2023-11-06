import { GeneralClient, CreateCustomerInformationDto,CustomerInformationDto  } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerInformationService {
  constructor(private client: GeneralClient) {}

  getAllCustomerInformation() : Observable<CustomerInformationDto[]> {
    return this.client.apiCustomerinformationGetall();
  }

  addCustomerInformation(newsCategory: CreateCustomerInformationDto) {
    return this.client.apiCustomerinformationCreate(newsCategory);
  }

  editCustomerInformation(id: string, newsCategory: CreateCustomerInformationDto) {
    return this.client.apiCustomerinformationUpdate(id, newsCategory);
  }

  deleteCustomerInformation(id: string) {
    return this.client.apiCustomerinformationDelete(id);
  }
}
