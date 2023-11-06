import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './container/banner.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormTableModule } from 'app/admin/components/form-table/form-table.module';
import { FormDialogModule } from 'app/admin/components/form-dialog/form-dialog.module';

@NgModule({
  declarations: [BannerComponent],
  imports: [CommonModule, BannerRoutingModule, SharedModule,FormDialogModule,FormTableModule],
  exports: [BannerComponent],
})
export class BannerModule {}
