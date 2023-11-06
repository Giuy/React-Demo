import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Columns } from 'app/api-clients/interface';
import { AttachmentService } from 'app/services/attachment.service';
import { MessageService } from 'primeng/api';
import { MaintainanceRequestService } from 'app/services/maintainance-request.service';
import {
  MaintenanceRequestDto,
  MaintenanceRequestFilterDto,
  MaintenanceRequestOperationInfoDto,
  MaintenanceRequestStatusDto,
} from 'app/api-clients/general-client';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-landlord-maintenance-request',
  templateUrl: './landlord-maintenance-request.component.html',
  styleUrls: ['./landlord-maintenance-request.component.scss'],
})
export class LandlordMaintenanceRequestComponent implements OnInit, OnDestroy {
  search: string;
  status = 0;
  landlord: any;
  listStatus: MaintenanceRequestStatusDto[];
  listLandlordRequest: MaintenanceRequestDto[];
  private destroyed$ = new Subject<void>();
  pageNumber: number = 1;
  pageSize = 10;
  totalRecords: number = 0;
  loading= false;

  note: string;
  historySteps: MaintenanceRequestOperationInfoDto[];
  reasonUpdate = new FormControl('');

  mockData = [
    {
      id: '1',
      address: '92D Nguyễn Hữu Cảnh',
      landlord: 'Trực',
      area: 'bedroom',
      error: 'Broken bed',
      createDate: new Date(),
      finishDate: new Date(),
      status: 1,
      paymentStatus: 1,
    },
    {
      id: '2',
      address: '92D Nguyễn Hữu Cảnh',
      landlord: 'Trực',
      area: 'bedroom',
      error: 'Broken bed',
      createDate: new Date(),
      finishDate: new Date(),
      status: 2,
      paymentStatus: 2,
    },
  ];
  propertyOptions = [
    {
      name: '92D Nguyễn Hữu Cảnh | Trực | 1',
      value: '1',
    },
    {
      name: '92D Nguyễn Hữu Cảnh | Trực | 2',
      value: '2',
    },
  ];
  areaOptions = [
    {
      name: 'Bedroom',
      value: '1',
    },
    {
      name: 'Bathroom',
      value: '2',
    },
  ];
  errorTypeOptions = [
    {
      name: 'broken',
      value: '1',
    },
    {
      name: 'old',
      value: '2',
    },
  ];
  errorDetailOptions = [
    {
      name: 'crack',
      value: '1',
    },
    {
      name: 'crack',
      value: '2',
    },
  ];

  requestInformation: any[];
  cols: Columns[];
  dialogHistory = false;
  dialogAdd = false;
  isEdit = false;
  selectedProperty = [];
  form: FormGroup;
  fileData: any;
  searchText = new FormControl();
  dialogStatus = false;

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  constructor(
    private fb: FormBuilder,
    private attachmentService: AttachmentService,
    private messageService: MessageService,
    private router: Router,
    private maintenanceService: MaintainanceRequestService
  ) {}

  ngOnInit(): void {
    this.reloadData();
    this.initCols();
    this.initForm();
    this.loadStatus();
  }

  initForm() {
    this.form = this.fb.group({
      property: ['', Validators.required],
      area: ['', Validators.required],
      errorType: ['', Validators.required],
      errorDetail: ['', Validators.required],
      notes: [''],
      imageUrl: ['', Validators.required],
      imagePath: [''],
    });
  }

  reloadData() {
    this.loading=true;

    let model: MaintenanceRequestFilterDto = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchText: this.search,
      listTicketStatus: [this.status],
    };
    this.listLandlordRequest = [];
    this.maintenanceService
      ?.getLandlordRequest(model)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          this.loading=false;
          this.listLandlordRequest = data.items;
          this.totalRecords = data.totalCount;
          this.pageNumber = data.pageIndex;
        },
        (error) => {
          this.loading=false;
          this.listLandlordRequest = [];
        }
      );
  }
  loadStatus() {
    this.maintenanceService.getLandlordStatus().subscribe((res) => {
      this.listStatus = res;
    });
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

  openNew() {
    this.dialogAdd = true;
  }

  openShow(item) {
    this.router.navigate(['/maintenance-request/detail/', item.id], {
      queryParams: { landlord: true },
    });
  }

  openStatus(item) {
    if (item.ticketStatus==1) {
      this.dialogStatus = true;
      this.reasonUpdate.setValue('');

      this.landlord = item;
    }else{
      this.showMessage('error', 'Error', 'Cannot change status the ticket that has been rejected !');
      
    }
    
   
  }

  changeStatus(status: string) {
    if (status === 'approve') {
      this.dialogStatus = false;
      let obj = {
        maintenanceRequestId: this.landlord.id,
        isApprove: true,
        isReject: false,
        notes: this.reasonUpdate.value,

      };
      this.maintenanceService.approvedStatus(obj).subscribe(
        (res) => {
          if (res.succeeded) {
            this.showMessage('success', 'Success', 'Approved!');
            this.loadStatus();
            this.reloadData();
          } else {
            this.showMessage('error', 'Error', res.errors[0]);
          }
        },
        (err) => {
          this.showMessage('error', 'Error', 'An unexpected server error occurred!');
        }
      );
    }

    if (status === 'reject') {
      this.dialogStatus = false;
      let obj = {
        maintenanceRequestId: this.landlord.id,
        isApprove: false,
        isReject: true,
        notes: this.reasonUpdate.value,

      };
      this.maintenanceService.approvedStatus(obj).subscribe(
        (res) => {
          if (res.succeeded) {
            this.showMessage('success', 'Success', 'Rejected!');
            this.reloadData()
            this.loadStatus()
          } else {
            this.showMessage('error', 'Error', res.errors[0]);
          }
        },
        (err) => {
          this.showMessage('error', 'Error', 'An unexpected server error occurred!');
        }
      );
    }
  }

  openHistory(item) {
    this.dialogHistory = true;
    this.maintenanceService.getMaintainanceRequestHistory(item.id).subscribe((res) => {
      this.historySteps = res;
    });
  }

  onSubmit() {}

  chooseFile(event) {
    event.preventDefault();
    document.getElementById('file').click();
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileData = {
        data: file,
        fileName: file.name,
      };
      const reader = new FileReader();
      reader.onload = (e) => {
        this.form.patchValue({
          imageUrl: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  pageChange(event: any) {
    this.pageSize = event?.rows;
    this.pageNumber = event?.page + 1;
    this.reloadData();
  }
  async uploadFileProcess() {
    let success = false;
    try {
      const result = await this.attachmentService.uploadBanner(this.fileData).toPromise();
      if (result.succeeded) {
        const { fileName, fileUrl, filePath } = result.objectReturn;
        this.form.patchValue({
          imageUrl: fileUrl,
        });
        this.form.patchValue({
          imagePath: filePath,
        });
        this.form.patchValue({
          imageName: fileName,
        });
        success = true;
      } else {
        this.showMessage('error', 'Error', result.errors[0]);
      }
    } catch (err) {
      this.showMessage('error', 'Error', 'Upload image failed!');
    }

    return success;
  }

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }
  onChangeTitleFitler(e: any) {
    this.search = e;
    this.reloadData();
  }
  selectStatus(item) {
    this.status = item.status;
    this.reloadData();
  }
  ngOnDestroy(): void {}
}
