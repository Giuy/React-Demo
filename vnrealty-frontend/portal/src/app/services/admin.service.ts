import { FileParameter, GeneralClient,  CreateNewsDto, SearchingNewsDto  } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private client: GeneralClient) {}

  checkAccess() {
    return this.client.apiAdminCheckaccessportal();
  }

  
}
