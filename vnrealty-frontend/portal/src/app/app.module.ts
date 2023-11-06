import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoadingService } from './core/services/loading.service';
import {BlockUIModule} from 'primeng/blockui';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [AppComponent, SafePipe],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProgressBarModule,
    BlockUIModule
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
