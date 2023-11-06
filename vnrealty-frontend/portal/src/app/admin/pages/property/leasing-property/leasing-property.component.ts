import {
  FilterMyPropertyDto,
  FilterWebsitePropertyDto,
  PaginatedListOfPropertyDto,
  PropertyDto,
  PropertyStatusDto,
} from './../../../../api-clients/general-client';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormDialogComponent } from 'app/admin/components/form-dialog/form-dialog.component';
import { FormTableComponent } from 'app/admin/components/form-table/form-table.component';
import { CommonListInfoDto, CreateCommonListInfoDto } from 'app/api-clients/general-client';
import { CommonListInfoService } from 'app/services/common-list-info.service';
import { PropertyService } from 'app/services/property.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-leasing-property',
  templateUrl: './leasing-property.component.html',
  styleUrls: ['./leasing-property.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class LeasingPropertyComponent implements OnInit, AfterViewInit, OnDestroy {
  cols: any[];

  submitted = false;
  listCommonListInfo: PropertyDto[];
  listStatus: PropertyStatusDto[];
  editMode = false;
  countStatusAvailabel: number;
  search: string;
  status = 0;
  arrGroupField = [];
  dataId = '';
  formName = 'Property';
  dialogName = 'Property';
  uploadServiceType = 'Property';
  fileFields = [];
  dialogHistory = false;
  totalRecords: number = 0;
  pageNumber: number = 1;
  pageSize = 10;
  loading= false;
  historySteps: any;

  private destroyed$ = new Subject<void>();
  @ViewChild(FormDialogComponent) formDialog: FormDialogComponent;
  @ViewChild(FormTableComponent) formTable: FormTableComponent;

  constructor(private service: PropertyService, private router: Router) {}

  async ngOnInit() {
    this.reloadData();
    this.initCols();
    this.loadMypropertyStatus();
  }
  initCols() {
    this.cols = [
      {
        field: 'code',
        header: 'Property ID',
      },
      {
        field: 'location',
        header: 'Property Address',
      },
      {
        field: 'transactionType',
        header: 'Transaction Type',
      },
      {
        field: 'categoryName',
        header: 'Property Prices (USD)',
      },
      {
        field: 'leaseDate',
        header: 'Lease Date',
      },
      {
        field: '',
        header: 'Expired Date',
      },
      {
        field: 'isActived',
        header: 'Status',
      },
      // {
      //   field: 'created',
      //   header: 'Action',
      // },
    ];
  }
  reloadData() {
    this.loading=true;
    let model: FilterMyPropertyDto = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchText: this.search,
      listStatus: [this.status],
    };
    this.listCommonListInfo = [];
    this.service
      .getLeasingProperty(model)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          this.loading=false;
          this.listCommonListInfo = data.items;
          this.totalRecords = data.totalCount;
          this.pageNumber = data.pageIndex;
          this.countStatusAvailabel = this.listCommonListInfo.filter((item) => item.status === 1).length;
        },
        (error) => {
          this.loading=false;

          this.listCommonListInfo = [];
        }
      );
  }

  loadMypropertyStatus() {
    this.service.getLeasingPropertyStatus().subscribe((res) => {
      this.listStatus = res;
    });
  }

  onChangeTitleFitler(e: any) {
    this.search = e;
    this.reloadData();
  }
  selectStatus(item) {
    this.status = item.status;
    this.reloadData();
  }

  openDetail(item) {
    this.router.navigate(['/detail/', item.id], { queryParams: { leasing: true } });
  }
  pageChange(event: any) {
    this.pageSize = event?.rows;
    this.pageNumber = event?.page + 1;
    this.reloadData();
  }
  ngOnDestroy(): void {}
  ngAfterViewInit(): void {}
}
