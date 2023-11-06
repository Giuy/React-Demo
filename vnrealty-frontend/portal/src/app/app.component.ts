import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(private loadingService: LoadingService, private router: Router, private _cdr: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          this._cdr.detectChanges();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          this._cdr.detectChanges();
          break;
        }
        default: {
          this._cdr.detectChanges();
          break;
        }
      }
    });
  }

  ngOnInit() {
    
    this.loadingService.IsLoading.subscribe((i) => {
      this.loading = i;
      this._cdr.detectChanges();
    });
  }
}
