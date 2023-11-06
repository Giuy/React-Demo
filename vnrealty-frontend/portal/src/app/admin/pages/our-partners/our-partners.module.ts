import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurPartnersRoutingModule } from './our-partners-routing.module';
import { OurPartnersComponent } from './container/our-partners.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormTableModule } from 'app/admin/components/form-table/form-table.module';
import { FormDialogModule } from 'app/admin/components/form-dialog/form-dialog.module';


@NgModule({
  declarations: [OurPartnersComponent],
  imports: [CommonModule, OurPartnersRoutingModule, SharedModule,FormDialogModule,FormTableModule],
  exports: [OurPartnersComponent],
})
export class OurPartnersModule {}
