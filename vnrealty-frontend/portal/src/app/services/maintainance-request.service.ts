import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMaintenanceRequestDto, GeneralClient } from 'app/api-clients/general-client';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintainanceRequestService {
  constructor(private client: GeneralClient, private http: HttpClient) {}

  getTenantRequest(model) {
    return this.client.apiMaintenancerequestGetbytenant(model);
  }
  getMasterData() {
    let area = this.client.apiMasterdataGetmasterdatamaintenancearea();
    let errorType = this.client.apiMasterdataGetmasterdataerrortype();
    let errorDetail = this.client.apiMasterdataGetmasterdataerrordetails();
    return forkJoin([area, errorType, errorDetail]);
  }
  createTenantRequest(model) {
    return this.client.apiMaintenancerequestCreate(model);
  }
  updateTenantRequest(id:string,createDto: CreateMaintenanceRequestDto){
    return this.client.apiMaintenancerequestUpdate(id,createDto);
  }
  getMaintenanceStatus() {
    return this.client.apiMaintenancerequestGetstatusbytenant();
  }
  getMaintainanceRequestHistory(id) {
    return this.client.apiMaintenancerequestGetoperationbymaintenanceid(id);
  }
  getLandlordStatus() {
    return this.client.apiMaintenancerequestGetstatusbylandlord();
  }
  getLandlordRequest(model) {
    return this.client.apiMaintenancerequestGetbylandlord(model);
  }
  approvedStatus(model) {
    return this.client.apiMaintenancerequestApprovebylandlord(model);
  }
  getRoles() {
    return this.client.apiPortalGetroles().toPromise();
  }
}
