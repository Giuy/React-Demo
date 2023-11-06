import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { MasterDataComponent } from './container/master-data.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormTableModule } from 'app/admin/components/form-table/form-table.module';
import { FormDialogModule } from 'app/admin/components/form-dialog/form-dialog.module';


@NgModule({
  declarations: [MasterDataComponent],
  imports: [CommonModule, MasterDataRoutingModule, SharedModule,FormDialogModule,FormTableModule],
  exports: [MasterDataComponent],
})
export class MasterDataModule {}
