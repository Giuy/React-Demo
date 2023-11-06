import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactEmailRoutingModule } from './contact-email-routing.module';
import { ContactEmailComponent } from './container/contact-email.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [ContactEmailComponent],
  imports: [CommonModule, ContactEmailRoutingModule, SharedModule],
  exports: [ContactEmailComponent],
})
export class ContactEmailModule {}
