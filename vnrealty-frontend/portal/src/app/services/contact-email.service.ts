import { Injectable } from '@angular/core';
import {  FileParameter, GeneralClient } from 'app/api-clients/general-client';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactEmailService {
  constructor(private client: GeneralClient) {}

  // ==========================
  // ContactEmail
  // ==========================
  getAllContactEmail() {
    // return this.client.apiContactemailGetallcontactemail();
  }

  addContactEmail(model: any) {
    // return this.client.apiContactemailCreate(model)      
    // .pipe(
    //   map(response => {
    //     return response;
    //   }),
    //   catchError((err: any) => {
    //     return err;
    //   })
    // );
  }

  editContactEmail(id: string, model: any) {
    // return this.client.apiContactemailUpdate(id, model)
    // .pipe(
    //   map(response => {
    //     return response;
    //   }),
    //   catchError((err: any) => {
    //     return err;
    //   })
    // );
  }

  deleteContactEmail(id: string) {
    // return this.client.apiContactemailDelete(id)
    // .pipe(
    //   map(response => {
    //     return response;
    //   }),
    //   catchError((err: any) => {
    //     return err;
    //   })
    // );
  }

  uploadImage(file: FileParameter) {
    return this.client.apiPhotoUploadimage(file);
  }
}