import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTableComponent } from './form-table.component';
import { SharedModule } from 'app/shared/shared.module';
import { BannerRoutingModule } from 'app/admin/pages/banner/banner-routing.module';


@NgModule({
  declarations: [FormTableComponent],
  imports: [CommonModule, BannerRoutingModule, SharedModule],
  exports: [FormTableComponent],
})
export class FormTableModule {}
