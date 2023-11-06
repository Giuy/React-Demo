import {
  FilterMyPropertyDto,
  MaintenanceRequestDto,
  MaintenanceRequestOperationInfoDto,
  MaintenanceRequestStatusDto,
  MasterDataDto,
  PropertyDto,
} from './../../../../../api-clients/general-client';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Columns } from 'app/api-clients/interface';
import { AttachmentService } from 'app/services/attachment.service';
import { MessageService } from 'primeng/api';
import { MaintenanceRequestFilterDto } from 'app/api-clients/general-client';
import { MaintainanceRequestService } from 'app/services/maintainance-request.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PropertyService } from 'app/services/property.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-tenant-maintenance-request',
  templateUrl: './tenant-maintenance-request.component.html',
  styleUrls: ['./tenant-maintenance-request.component.scss'],
  providers: [MessageService],
})
export class TenantMaintenanceRequestComponent implements OnInit, OnDestroy {
  search: string;
  listTenantRequest: MaintenanceRequestDto[];
  private destroyed$ = new Subject<void>();
  listMaintenanceArea: MasterDataDto[];
  listErrorType: MasterDataDto[];
  listErrorDetail: MasterDataDto[];
  listProperty: PropertyDto[];
  arrField = [];
  arrFileData = [];
  form: FormGroup;
  imageIndex = 0;
  requestInformation: any[];
  cols: Columns[];
  dialogHistory = false;
  dialogAdd = false;
  isEdit = false;
  selectedProperty = [];
  fileData: any[];
  searchText = new FormControl();
  listImage: any[] = [];
  listStatus: MaintenanceRequestStatusDto[];
  get imageUrl() {
    return this.form.get('imageUrl');
  }
  status = 0;
  totalRecords: number = 0;
  pageNumber: number = 1;
  pageSize = 10;
  loading= false;

  historySteps: MaintenanceRequestOperationInfoDto[];

  filterProperty: FilterMyPropertyDto = {
    pageNumber: 1,
    pageSize: 1000,
    searchText: '',
    listStatus: [],
  };

  constructor(
    private fb: FormBuilder,
    private attachmentService: AttachmentService,
    private messageService: MessageService,
    private router: Router,
    private maintenanceService: MaintainanceRequestService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.reloadData();
    this.initCols();
    this.initForm();
    this.loadStatus();
    this.maintenanceService.getMasterData().subscribe((res) => {
      this.listMaintenanceArea = res[0];
      this.listErrorType = res[1];
      this.listErrorDetail = res[2];
    });
    this.propertyService.getLeasingProperty(this.filterProperty).subscribe((res) => {
      this.listProperty = res?.items.filter((x) => x.status != 6);
    });
  }

  initForm() {
    this.form = this.fb.group({
      property: ['', Validators.required],
      area: ['', Validators.required],
      errorType: ['', Validators.required],
      errorDetail: ['', Validators.required],
      notes: [''],
    });
  }

  getDefaultValue(field) {
    if (field.defaultValue == undefined) {
      if (field.fieldType == 'multipleSelect') {
        return [];
      }
    } else {
      return field.defaultValue;
    }
    return '';
  }

  reloadData() {
    this.loading=true;

    let model: MaintenanceRequestFilterDto = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchText: this.search,
      listTicketStatus: [this.status],
    };
    this.listTenantRequest = [];
    this.maintenanceService
      ?.getTenantRequest(model)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          this.loading=false;
          this.listTenantRequest = data.items;
          this.totalRecords = data.totalCount;
          this.pageNumber = data.pageIndex;
        },
        (error) => {
          this.loading=false;
          this.listTenantRequest = [];
        }
      );
  }

  onChangeTitleFitler(e: any) {
    this.search = e;
    this.reloadData();
  }

  initCols() {
    this.cols = [
      {
        field: 'id',
        header: 'Ticket ID',
      },
      {
        field: 'address',
        header: 'Property Address',
      },
      {
        field: 'listMaintenanceArea',
        header: 'Maintenance Area',
      },
      {
        field: 'error',
        header: 'Error',
      },
      {
        field: 'createDate',
        header: 'Request Date',
      },
      {
        field: 'finishDate',
        header: 'Finish Date',
      },
      {
        field: 'status',
        header: 'Ticket Status',
      },
    ];
  }

  public id: any;
  pageChange(event: any) {
    this.pageSize = event?.rows;
    this.pageNumber = event?.page + 1;
    this.reloadData();
  }
  openNew(item) {
    if (item) {
      if (item.ticketStatus == 1) {
        this.dialogAdd = true;
        this.id = item.id;
        this.form.patchValue({
          property: item.propertyId,
          area: item.listMaintenanceArea.map((x) => x.masterDataId),
          errorType: item.listErrorType.map((x) => x.masterDataId),
          errorDetail: item.listErrorDetails.map((x) => x.masterDataId),
          notes: item.notes,
        });
        this.listImage = item.maintenanceRequestImages;
      } else {
      this.showMessage('error', 'Error', 'Cannot update request that has been rejected !');

      }
    } else {
      this.dialogAdd = true;
      this.id = undefined;
      this.form.reset();
      this.listImage = [];
    }
  }
  // openEdit(item) {
  //   this.dialogAdd = true;
  // }
  createTenant() {
    if (this.form.invalid) {
      //thong bao khi form invalid
      return;
    }
    if (this.listImage && this.listImage.length == 0) {
      //thong bao khi image khong co cai nao
      return;
    }
    let val = this.form.value;
    let model = {
      propertyId: val.property,
      listMaintenanceAreaId: val.area,
      listErrorTypeId: val.errorType,
      listErrorDetailsId: val.errorDetail,
      maintenanceRequestImages: this.listImage,
      notes: val.notes,
    };
    if (this.id) {
      this.maintenanceService?.updateTenantRequest(this.id, model).subscribe(
        (res) => {
          if (res.succeeded) {
            this.showMessage('success', 'Successful', 'Update successfully!');
            this.dialogAdd = false;
            this.reloadData();
            this.loadStatus();
          } else {
            if (res.errors.length > 0) {
              this.showMessage('error', 'Error', res.errors[0]);
            } else {
              this.showMessage('error', 'Error', 'Update failed');
            }
          }
        },
        (err) => {
          this.showMessage('error', 'Error', 'An unexpected server error occurred!');
        }
      );
    } else {
      this.maintenanceService?.createTenantRequest(model).subscribe(
        (res) => {
          if (res.succeeded) {
            this.showMessage('success', 'Successful', 'Create successfully!');
            this.dialogAdd = false;
            this.reloadData();
            this.loadStatus();
          } else {
            if (res.errors.length > 0) {
              this.showMessage('error', 'Error', res.errors[0]);
            } else {
              this.showMessage('error', 'Error', 'Add failed');
            }
          }
        },
        (err) => {
          this.showMessage('error', 'Error', 'An unexpected server error occurred!');
        }
      );
    }
  }

  openDetail(item) {
    this.router.navigate(['/maintenance-request/detail/', item.id], {
      queryParams: { tenant: true },
    });
  }

  openHistory(item) {
    this.dialogHistory = true;
    this.maintenanceService.getMaintainanceRequestHistory(item.id).subscribe((res) => {
      this.historySteps = res;
    });
  }

  chooseFile(event) {
    event.preventDefault();
    document.getElementById('othersImage').click();
  }

  async onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        let modelFile = {
          data: file,
          fileName: file.name,
        };
        await this.uploadFileProcess(modelFile);
        const reader = new FileReader();
        reader.readAsDataURL(file);
      }
    }
  }

  getMultipleImage(id) {
    return this.form.get(id)?.value;
  }
  loadStatus() {
    this.maintenanceService.getMaintenanceStatus().subscribe((res) => {
      this.listStatus = res;
    });
  }
  selectStatus(item) {
    this.status = item.status;
    this.reloadData();
  }
  async uploadFileProcess(file) {
    let success = false;
    try {
      const result = await this.attachmentService.uploadImage(file, 'MaintenanceRequest').toPromise();
      if (result.succeeded) {
        const { fileName, fileUrl, filePath } = result.objectReturn;
        let img = {
          imageUrl: fileUrl,
          imageName: fileName,
          imagePath: filePath,
        };
        this.listImage.push(img);
        success = true;
      } else {
        this.showMessage('error', 'Error', result.errors[0]);
      }
    } catch (err) {
      this.showMessage('error', 'Error', 'Upload image failed!');
    }

    return success;
  }
  removeImageItem(index) {
    this.listImage.splice(index, 1);
  }

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }

  getLabelProperty(id: string): string {
    let title = '';
    let property = this.listProperty.find((x) => x.id == id);
    if (property) {
      title = `${property.location} | ${property.hostInformation} | ${property.propertyId}`;
    }
    return title;
  }

  ngOnDestroy(): void {}
}
