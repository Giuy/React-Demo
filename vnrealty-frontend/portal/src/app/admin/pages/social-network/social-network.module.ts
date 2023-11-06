import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialNetworkRoutingModule } from './social-network-routing.module';
import { SocialNetworkComponent } from './container/social-network.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [SocialNetworkComponent],
  imports: [CommonModule, SocialNetworkRoutingModule, SharedModule],
  exports: [SocialNetworkComponent],
})
export class SocialNetworkModule {}
