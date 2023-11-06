import {
  FileParameter,
  GeneralClient,
  CreatePropertyDto,
  CreateNewsDto,
  SearchingNewsDto,
} from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private client: GeneralClient, private http: HttpClient) {}

  getAllProperty(model) {
    return this.client.apiPortalGetmyproperty(model);
  }
  getMyPropertyStatus() {
    return this.client.apiPortalGetmypropertystatus();
  }
  getMyPropertyById(id){
    return this.client.apiPortalGetmypropertybyid(id)
  }
  getMyPropertyHistory(id){
    return this.client.apiPortalGetmypropertyhistory(id)
  }
  addProperty(newsCategory: CreatePropertyDto) {
    return this.client.apiPropertyCreate(newsCategory);
  }
  getLeasingProperty(model:any){
    return this.client.apiPortalGetleasingproperty(model);
  }
  getLeasingPropertyStatus(){
    return this.client.apiPortalGetleasingpropertystatus()
  }
  getLeasingPropertyById(id){
    return this.client.apiPortalGetleasingpropertybyid(id)
  }
  getImages() {
    return this.http
      .get<any>('assets/img/photos.json')
      .toPromise()
      .then((res) => <any[]>res.data)
      .then((data) => {
        return data;
      });
  }
  //editProperty(id: string, newsCategory: CreatePropertyDto) {
  //  return this.client.apiPropertyUpdate(id, newsCategory);
  //}

  //deleteProperty(id: string) {
  //  return this.client.apiPropertyDelete(id);
  //}
}
