import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentRoutingModule } from './attachment-routing.module';
import { AttachmentComponent } from './container/attachment.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [AttachmentComponent],
  imports: [CommonModule, AttachmentRoutingModule, SharedModule],
  exports: [AttachmentComponent],
})
export class AttachmentModule {}
