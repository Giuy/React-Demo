import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonConfigRoutingModule } from './common-config-routing.module';
import { CommonConfigComponent } from './container/common-config.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [CommonConfigComponent],
  imports: [CommonModule, CommonConfigRoutingModule, SharedModule],
  exports: [CommonConfigComponent],
})
export class CommonConfigModule {}
