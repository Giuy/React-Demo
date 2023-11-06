import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './container/news.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [NewsComponent, NewsComponent],
  imports: [CommonModule, NewsRoutingModule, SharedModule],
  exports: [NewsComponent],
})
export class NewsModule {}
