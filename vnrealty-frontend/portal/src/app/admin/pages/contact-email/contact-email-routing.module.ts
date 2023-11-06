import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactEmailComponent } from './container/contact-email.component';

const routes: Routes = [
  {
    path: '',
    component: ContactEmailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactEmailRoutingModule { }
