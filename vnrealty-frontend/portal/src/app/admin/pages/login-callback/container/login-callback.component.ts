import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { MessageService } from 'primeng/api';
import { AuthorizeService } from 'app/services/authorize.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  providers: [MessageService],
})
export class LoginCallBackComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  constructor(
    private messageService: MessageService,
    private authorizeService: AuthorizeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const url = window.location.href;
    const user = await this.authorizeService.completeSignIn(url);
    if (user != null) {
      // const returnUrl = user.state;
      const returnUrl = '/';
      this.router.navigateByUrl(returnUrl);
    } else {
      this.showMessage('error', 'Error', 'Error');
    }
  }

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
