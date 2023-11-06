import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormDialogModule } from 'app/admin/components/form-dialog/form-dialog.module';
import { FormTableModule } from 'app/admin/components/form-table/form-table.module';
import { SharedModule } from 'app/shared/shared.module';
import { LandlordMaintenanceRequestComponent } from './container/landlord-maintenance-request/landlord-maintenance-request.component';
import { TenantMaintenanceRequestComponent } from './container/tenant-maintenance-request/tenant-maintenance-request.component';
import { MaintenanceRequestRoutingModule } from './maintenance-request-routing.module';
import { MaintenanceRequestComponent } from './maintenance-request.component';
import { DetailMaintenanceComponent } from './container/detail-maintenance/detail-maintenance.component';
import { GalleriaModule } from 'primeng/galleria';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    MaintenanceRequestComponent,
    TenantMaintenanceRequestComponent,
    LandlordMaintenanceRequestComponent,
    DetailMaintenanceComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRequestRoutingModule,
    SharedModule,
    FormDialogModule,
    FormTableModule,
    FormsModule,
    ReactiveFormsModule,
    ChipsModule,
    GalleriaModule,
    PaginatorModule

  ],
  exports: [MaintenanceRequestComponent],
})
export class MaintenanceRequestModule {}
