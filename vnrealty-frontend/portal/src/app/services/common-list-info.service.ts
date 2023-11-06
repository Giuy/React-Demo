import { FileParameter, GeneralClient, CreateCommonListInfoDto, CreateNewsDto, SearchingNewsDto  } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonListInfoService {
  constructor(private client: GeneralClient) {}

  getAllCommonListInfo() {
    return this.client.apiCommonlistinfoGetall();
  }

  getCommonListInfoByType(data) {
    // return this.client.apiCommonlistinfoGetbytype(data);
  }

  addCommonListInfo(createData: CreateCommonListInfoDto) {
    return this.client.apiCommonlistinfoCreate(createData);
  }

  editCommonListInfo(id: string, updateData: CreateCommonListInfoDto) {
    return this.client.apiCommonlistinfoUpdate(id, updateData);
  }

  deleteCommonListInfo(id: string) {
    return this.client.apiCommonlistinfoDelete(id);
  }
}
