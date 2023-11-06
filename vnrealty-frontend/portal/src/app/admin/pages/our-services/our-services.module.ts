import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurServicesRoutingModule } from './our-services-routing.module';
import { OurServicesComponent } from './container/our-services.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormTableModule } from 'app/admin/components/form-table/form-table.module';
import { FormDialogModule } from 'app/admin/components/form-dialog/form-dialog.module';


@NgModule({
  declarations: [OurServicesComponent],
  imports: [CommonModule, OurServicesRoutingModule, SharedModule,FormDialogModule,FormTableModule],
  exports: [OurServicesComponent],
})
export class OurServicesModule {}
