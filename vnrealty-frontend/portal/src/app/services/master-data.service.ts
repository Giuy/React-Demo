import { GeneralClient,CreateMasterDataDto  } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {
  constructor(private client: GeneralClient) {}

  getMasterDataByType(data) {
    return this.client.apiMasterdataGetmasterdatabytype(data);
  }

  getMasterDataPropertyType() {
    return this.client.apiMasterdataGetmasterdatapropertytype();
  }

  getMasterDataFeaturesCity() {
    return this.client.apiMasterdataGetmasterdatafeaturescity();
  }
  
  getAllMasterDataType() {
    return this.client.apiMasterdataGetallmasterdatatype();
  }

  addMasterData(createData: CreateMasterDataDto) {
    return this.client.apiMasterdataCreate(createData);
  }

  editMasterData(id: string, updateData: CreateMasterDataDto) {
    return this.client.apiMasterdataUpdate(id, updateData);
  }

  deleteMasterData(id: string) {
    return this.client.apiMasterdataDelete(id);
  }
}
