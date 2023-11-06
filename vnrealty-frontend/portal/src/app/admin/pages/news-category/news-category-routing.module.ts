import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsCategoryComponent } from './container/news-category.component';

const routes: Routes = [
  {
    path: '',
    component: NewsCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsCategoryRoutingModule { }
