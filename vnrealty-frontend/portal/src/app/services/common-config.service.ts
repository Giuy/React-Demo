import { FileParameter, GeneralClient, CreateCommonConfigDto  } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonConfigService {
  constructor(private client: GeneralClient) {}

  // ==========================
  // Common Config
  // ==========================
  getCommConfig(commonConfigType: string) {
    return this.client.apiCommonconfigGetcommonconfigbytype(commonConfigType);
  }

  saveCommonConfig(model: CreateCommonConfigDto) {
    return this.client.apiCommonconfigSavecommonconfig(model);
  }
}
