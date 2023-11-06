import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialNetworkComponent } from './container/social-network.component';

const routes: Routes = [
  {
    path: '',
    component: SocialNetworkComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialNetworkRoutingModule { }
