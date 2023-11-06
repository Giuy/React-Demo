import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';
import { StateService, States } from 'app/services/state.service';
import { AuthorizeService } from 'app/services/authorize.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService, 
    private injector: Injector,
    private authorizeService: AuthorizeService) 
    {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();
    if (request.url.startsWith('/api') && environment.production) {
      const baseUrl = environment.baseUrl;

      request = request.clone({
        url: baseUrl + request.url,
      });
    }

    return this.authorizeService.getAccessToken()
    .pipe(
      mergeMap((token) => this.processRequestWithToken(token, request, next)),
      finalize(()=>{
        this.loadingService.hideLoading();
      }));
    
  }

  private processRequestWithToken(token: string, req: HttpRequest<any>, next: HttpHandler) {
    if (!!token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }

}
