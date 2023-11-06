import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink';
import { NotFoundComponent } from './admin/pages/not-found/not-found.component';
import { AuthorizeService } from './core/services/authorize.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './core/interceptors/HttpConfigInterceptor';
import { UnAuthorizedInterceptor } from './core/interceptors/unauthorize.interceptor';
import { environment } from 'environments/environment';
import { API_BASE_URL as GENERAL_BASE_URL, GeneralClient } from './api-clients/general-client';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [QuicklinkModule, RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })],
  exports: [],
  providers: [
    AuthorizeService,
    GeneralClient,
    { provide: GENERAL_BASE_URL, useValue: environment.baseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnAuthorizedInterceptor, multi: true},
  ],
})
export class AppRoutingModule {}
