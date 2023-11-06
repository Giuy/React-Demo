import { FileParameter, GeneralClient, CreateContactCustomerDto  } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactCustomerService {
  constructor(private client: GeneralClient) {}

  // ==========================
  // Contact Customer
  // ==========================
  getAllContactCustomer() {
    return this.client.apiContactcustomerGetallcontactcustomer();
  }

  addContactCustomer(model: CreateContactCustomerDto) {
    return this.client.apiContactcustomerCreate(model);
  }

  editContactCustomer(id: string, model: CreateContactCustomerDto) {
    return this.client.apiContactcustomerUpdate(id, model);
  }

  deleteContactCustomer(id: string) {
    return this.client.apiContactcustomerDelete(id);
  }
}
