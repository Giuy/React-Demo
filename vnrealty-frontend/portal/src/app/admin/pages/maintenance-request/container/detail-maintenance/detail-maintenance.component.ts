import { takeUntil } from 'rxjs/operators';
import { MaintenanceRequestDto } from './../../../../../api-clients/general-client';
import { MaintenanceRequestFilterDto } from 'app/api-clients/general-client';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'app/services/property.service';
import { MaintainanceRequestService } from 'app/services/maintainance-request.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-detail-maintenance',
  templateUrl: './detail-maintenance.component.html',
  styleUrls: ['./detail-maintenance.component.scss'],
})
export class DetailMaintenanceComponent implements OnInit {
  id: any;
  request: any;
  listTenantRequest: MaintenanceRequestDto[];
  private destroyed$ = new Subject<void>();
  tenant: boolean = false;
  landlord: boolean = false;
  images: any[];
  accompany: any = [
    { title: 'Parking/Garage' },
    { title: 'Balcony/Iterace' },
    { title: 'Porter/security' },
    { title: 'Parking/Garage' },
    { title: 'Balcony/Iterace' },
  ];

  constructor(
    private service: PropertyService,
    private _activatedRoute: ActivatedRoute,
    private maintenanceService: MaintainanceRequestService
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;
    this.tenant = !!this._activatedRoute.snapshot.queryParamMap.get('tenant');
    this.landlord = !!this._activatedRoute.snapshot.queryParamMap.get('landlord');
    this.reloadData();
    this.service.getImages().then((images) => (this.images = images));

  }

  reloadData() {
    let model: MaintenanceRequestFilterDto = {
      pageNumber: 1,
      pageSize: 1000,
      searchText: '',
      listTicketStatus: [],
    };
    this.listTenantRequest = [];
    if (this.id) {
      if (this.tenant) {
        this.maintenanceService
          ?.getTenantRequest(model)
          .pipe(takeUntil(this.destroyed$))
          .subscribe(
            (data) => {
              this.listTenantRequest = data.items;
              this.request = this.listTenantRequest.find((x) => x.id == this.id);
            },
            (error) => {
              this.listTenantRequest = [];
            }
          );
      }
      if (this.landlord) {
        this.maintenanceService
        ?.getLandlordRequest(model)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(
          (data) => {
            this.listTenantRequest = data.items;
            this.request = this.listTenantRequest.find((x) => x.id == this.id);
          },
          (error) => {
            this.listTenantRequest = [];
          }
        );
      }
    }
  }
}
