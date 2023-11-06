import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsCategoryRoutingModule } from './news-category-routing.module';
import { NewsCategoryComponent } from './container/news-category.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [NewsCategoryComponent],
  imports: [CommonModule, NewsCategoryRoutingModule, SharedModule],
  exports: [NewsCategoryComponent],
})
export class NewsCategoryModule {}
