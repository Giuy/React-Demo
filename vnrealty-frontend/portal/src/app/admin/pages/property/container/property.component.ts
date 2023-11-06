import {
  FilterMyPropertyDto,
  FilterWebsitePropertyDto,
  PropertyHistoryDto,
  PropertyStatusDto,
} from './../../../../api-clients/general-client';
import { CreateCommonListInfoDto, CommonListInfoDto, PropertyImageType } from '../../../../api-clients/general-client';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { NewsCategoryDto, NewsDto } from 'app/api-clients/news-client';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  PropertyDto,
  CreatePropertyDto,
  PropertyTransactionType,
  PropertyStatus,
  MasterDataDto,
  PropertyImageDto,
} from 'app/api-clients/general-client';
import { PropertyService } from 'app/services/property.service';
import { MasterDataService } from 'app/services/master-data.service';
import { FormDialogComponent } from 'app/admin/components/form-dialog/form-dialog.component';
import { FormTableComponent } from 'app/admin/components/form-table/form-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PropertyComponent implements OnInit, AfterViewInit, OnDestroy {
  cols: any[];
  pageNumber: number = 1;
  pageSize = 10;
  totalRecords: number = 0;
  currentPage:number=1;
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
  arrPropertyType: Array<MasterDataDto> = [];
  arrFeaturesCity: Array<MasterDataDto> = [];
  dialogHistory = false;
  arrTransactionType = [
    { value: PropertyTransactionType.Rent, name: 'Rent' },
    { value: PropertyTransactionType.Sale, name: 'Sale' },
  ];
  historySteps: any;
  loading= false;

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
      .getAllProperty(model)
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
          this.listCommonListInfo = [];
        }
      );
  }

  loadMypropertyStatus() {
    this.service.getMyPropertyStatus().subscribe((res) => {
      this.listStatus = res;
    });
  }
  history(item) {
    this.dialogHistory = true;
    this.service.getMyPropertyHistory(item.id).subscribe((res) => {
      this.historySteps = res;
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
    this.router.navigate(['/detail/', item.id], { queryParams: { myProperty: true } });
  }

  ngOnDestroy(): void {}
  ngAfterViewInit(): void {}

  pageChange(event: any) {
    this.pageSize = event?.rows;
    this.pageNumber = event?.page + 1;
    this.reloadData();
  }
}
