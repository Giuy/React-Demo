import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTypeRoutingModule } from './project-type-routing.module';
import { ProjectTypeComponent } from './container/project-type.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [ProjectTypeComponent],
  imports: [CommonModule, ProjectTypeRoutingModule, SharedModule],
  exports: [ProjectTypeComponent],
})
export class ProjectTypeModule {}
