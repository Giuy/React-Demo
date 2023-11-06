import { DetailMaintenanceComponent } from './container/detail-maintenance/detail-maintenance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandlordMaintenanceRequestComponent } from './container/landlord-maintenance-request/landlord-maintenance-request.component';
import { TenantMaintenanceRequestComponent } from './container/tenant-maintenance-request/tenant-maintenance-request.component';
import { MaintenanceRequestComponent } from './maintenance-request.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceRequestComponent,
    children: [
      {
        path: 'tenant-maintenance-request',
        component: TenantMaintenanceRequestComponent,
      },
      {
        path: 'detail/:id',
        component: DetailMaintenanceComponent,
      },
      {
        path: 'landlord-maintenance-request',
        component: LandlordMaintenanceRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRequestRoutingModule {}
