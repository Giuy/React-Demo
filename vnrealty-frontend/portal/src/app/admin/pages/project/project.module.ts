import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './container/project.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [ProjectComponent],
  imports: [CommonModule, ProjectRoutingModule, SharedModule],
  exports: [ProjectComponent],
})
export class ProjectModule {}
