import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyRoutingModule } from './property-routing.module';
import { PropertyComponent } from './container/property.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormTableModule } from 'app/admin/components/form-table/form-table.module';
import { FormDialogModule } from 'app/admin/components/form-dialog/form-dialog.module';
import { LeasingPropertyComponent } from './leasing-property/leasing-property.component';
import { ChipsModule } from 'primeng/chips';
import { DetailPropertyComponent } from './detail-property/detail-property.component';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import {PaginatorModule} from 'primeng/paginator';
@NgModule({
  declarations: [PropertyComponent, LeasingPropertyComponent, DetailPropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    SharedModule,
    FormDialogModule,
    FormTableModule,
    ChipsModule,
    GalleriaModule,
    DialogModule,
    CarouselModule,
    PaginatorModule,
  ],
  exports: [PropertyComponent, LeasingPropertyComponent],
})
export class PropertyModule {}
