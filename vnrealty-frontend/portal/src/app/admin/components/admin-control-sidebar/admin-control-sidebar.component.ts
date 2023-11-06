import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaintainanceRequestService } from 'app/services/maintainance-request.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'admin-control-sidebar',
  templateUrl: './admin-control-sidebar.component.html',
  styleUrls: ['./admin-control-sidebar.component.scss'],
})
export class AdminControlSidebarComponent implements OnInit {
  items: MenuItem[];
  data: Date = new Date();
  roles: string[];
  permissionTenant: string = 'Tenant';
  permissionLandlord: string = 'Landlord';
  constructor(private router: Router, private maintenanceService: MaintainanceRequestService) {}

  handleRouting(url) {
    if (!!url === false) return;

    return this.router.navigateByUrl(url);
  }

  async ngOnInit(): Promise<void> {
    // let permission = localStorage.getItem('permission');
    await this.maintenanceService.getRoles().then((res) => {
      this.roles = res;
      if (res) {
        localStorage.setItem('permission', JSON.stringify(res));
      }
    });
    this.items = [
      /*
      {
        label: 'Quản Lý Đơn Hàng',
        icon: 'fas fa-cubes',
        items: [
          {
            label: 'Đơn Hàng',
            icon: 'pi pi-fw pi-pencil',
            routerLink: '/order',
          },
        ]
      },*/
      {
        label: 'TENANT NAME',
        icon: 'fas fa-cubes',
        visible: true,
        items: [
          {
            label: 'My Property',
            icon: 'pi pi-fw pi-comment',
            routerLink: '/property-portal',
            visible:
              this.roles && this.roles.length > 0 ? this.roles.some((x) => x === this.permissionLandlord) : false,
          },
          {
            label: 'My Leasing Property',
            icon: 'pi pi-fw pi-comment',
            routerLink: '/leasing',
            visible: this.roles && this.roles.length > 0 ? this.roles.some((x) => x === this.permissionTenant) : false,
          },
          {
            label: 'My Maintenance Request',
            icon: 'pi pi-fw pi-comment',
            visible: this.roles && this.roles.length > 0 ? this.roles.some((x) => x === this.permissionTenant) : false,
            routerLink: '/maintenance-request/tenant-maintenance-request',
          },
          {
            label: 'Tenant Maintenance Request',
            icon: 'pi pi-fw pi-comment',
            visible:
              this.roles && this.roles.length > 0 ? this.roles.some((x) => x === this.permissionLandlord) : false,
            routerLink: '/maintenance-request/landlord-maintenance-request',
          },
        ],
      },
    ];
  }
}
