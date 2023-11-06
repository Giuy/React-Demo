import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurTeamsRoutingModule } from './our-teams-routing.module';
import { OurTeamsComponent } from './container/our-teams.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormTableModule } from 'app/admin/components/form-table/form-table.module';
import { FormDialogModule } from 'app/admin/components/form-dialog/form-dialog.module';


@NgModule({
  declarations: [OurTeamsComponent],
  imports: [CommonModule, OurTeamsRoutingModule, SharedModule,FormDialogModule,FormTableModule],
  exports: [OurTeamsComponent],
})
export class OurTeamsModule {}
