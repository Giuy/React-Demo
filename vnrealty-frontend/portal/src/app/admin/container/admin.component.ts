import { Component, OnInit, HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from 'app/services/admin.service';
import { StateService, States } from 'app/services/state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from 'app/services/authorize.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService],
})
export class AdminComponent implements OnInit {
  isShow = false;
  topPosToStartShowing = 200;

  constructor(
    private messageService: MessageService,
    private userService: AdminService,
    private stateService: StateService,
    private router: Router,
    private authorizeService: AuthorizeService
  ) {}

  async ngOnInit() {
    this.authorizeService.getAccessToken().subscribe((accessToken)=>{
      if (accessToken != undefined && accessToken != "") {
        this.userService.checkAccess().subscribe((res) => {
          this.showMessageLoginSuccess();
        },
        (error)=>
        {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000,
          });
          
          
        });
      } else {
        this.router.navigate(['/login'],{queryParams: { returnUrl: this.router.routerState.snapshot.url }});
      }
    });
    
    
  }

  showMessageLoginSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Login successfully!',
      detail: '',
      life: 1000,
    });
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
