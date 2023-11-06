import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService, States } from 'app/services/state.service';
import { AuthorizeService } from 'app/services/authorize.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
})
export class AdminNavbarComponent implements OnInit {
  showMenu: boolean = false;
  userName: string;
  constructor(private router: Router, private stateService: StateService, private authorizeService: AuthorizeService) {}

  ngOnInit(): void {
    this.userName=localStorage.getItem('userName');
  }

  async logout() {
    const url = window.location.href;
    const returnUrl = this.router.routerState.snapshot.url;

    await this.authorizeService.signOut(returnUrl);

    //this.stateService.resetToken();
    //this.router.navigateByUrl('/login');
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
