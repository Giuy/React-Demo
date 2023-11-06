import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDialogComponent } from './form-dialog.component';
import { SharedModule } from 'app/shared/shared.module';
import { BannerRoutingModule } from 'app/admin/pages/banner/banner-routing.module';


@NgModule({
  declarations: [FormDialogComponent],
  imports: [CommonModule, BannerRoutingModule, SharedModule],
  exports: [FormDialogComponent],
})
export class FormDialogModule {}
