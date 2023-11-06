import { CreateCommonListInfoDto, CommonListInfoDto } from '../../../../api-clients/general-client';
import { Component, OnInit,AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService, States } from 'app/services/state.service';
import { PhotoService } from 'app/services/photo.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { NewsCategoryDto, NewsDto } from 'app/api-clients/news-client';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonListInfoService } from 'app/services/common-list-info.service';
import { FormDialogComponent } from 'app/admin/components/form-dialog/form-dialog.component'
import { FormTableComponent } from 'app/admin/components/form-table/form-table.component'

@Component({
  selector: 'app-our-teams',
  templateUrl: './our-teams.component.html',
  styleUrls: ['./our-teams.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class OurTeamsComponent implements OnInit,AfterViewInit, OnDestroy {
  cols: any[];

  submitted = false;
  listCommonListInfo: CommonListInfoDto[];
  editMode = false;
  arrGroupField = [];
  dataId = "";

  formName = "Our Teams";
  dialogName = "Our Teams";
  formType = "OurTeams";
  fileFields = [];

  private destroyed$ = new Subject<void>();
  @ViewChild(FormDialogComponent) formDialog: FormDialogComponent;
  @ViewChild(FormTableComponent) formTable: FormTableComponent;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: CommonListInfoService
  ) {}
  

  ngOnInit() {
    this.createFieldConfig();
    
    this.reloadData();
  }

  ngAfterViewInit(): void {
    this.formTable.setArrField(this.arrGroupField);
  }

  createFieldConfig(){

    this.arrGroupField = [
      {fieldId: 'fullName', fieldName: 'Full Name', showOnGrid: true, required: true,width: '14rem', fieldType: 'text'},
      {fieldId: 'avatar', fieldName: 'Avatar',showOnGrid: true, required: false,width: '14rem', fieldType: 'image'},
      {fieldId: 'department', fieldName: 'Department', showOnGrid: true, required: false,width: '14rem', fieldType: 'text'},
      {fieldId: 'position', fieldName: 'Position', showOnGrid: true, required: false,width: '14rem', fieldType: 'text'},
      {fieldId: 'shortDescription', fieldName: 'Short Description', showOnGrid: false, required: false,width: '6rem', fieldType: 'textArea'},
      {fieldId: 'description', fieldName: 'Description', showOnGrid: false, required: false,width: '6rem', fieldType: 'richText'},
    ];

    const arrField = this.arrGroupField.filter((element)=>{
      return (element.fieldType == "image" || element.fieldType == "file");
    });
    this.fileFields = arrField.map((element)=>{
      return element.fieldId;
    });
  }

  onSubmitEvent(event){
    if (this.editMode) {
      this.onEdit(event);
    } else {
      this.add(event);
    }
  }

  reloadData() {
    this.listCommonListInfo = [];
    // this.service
    //   .getCommonListInfoByType(this.formType)
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe(
    //     (data) => {
    //       if (data) {
    //         this.listCommonListInfo = data;
            
    //         this.formTable.setListData(this.listCommonListInfo);
    //       }
    //     },
    //     (error) => {
    //       this.listCommonListInfo = [];
    //     }
    //   );
  }

  onNewEvent(){
    this.editMode = false;

    this.formDialog.initFormDetail(this.arrGroupField);
    this.formDialog.setShowDialog();
  }

  hideDialog() {
    this.formDialog.setHideDialog();
    this.submitted = false;
  }


  onEditEvent(item){
    this.editMode = true;
    this.dataId = item.id;

    this.formDialog.initFormDetail(this.arrGroupField);
    this.formDialog.setValueForm(item.data);
    this.formDialog.setShowDialog();
  }

  async onEdit(dataDetail) {
    const data: CreateCommonListInfoDto = {
      type: this.formType,
      privateType: '',
      fileFields: this.fileFields,
      isActive: true,
      data: dataDetail
    };

    this.service.editCommonListInfo(this.dataId, data).subscribe(
      (result) => {
        if (result && result.succeeded) {
          this.showMessage('success', 'Successful', 'Update successfully!');
          this.reloadData();
          this.hideDialog();
        } else {
          if (result.errors.length > 0) {
            this.showMessage('error', 'Error', result.errors[0]);
          } else {
            this.showMessage('error', 'Error', 'Update failed!');
          }
        }
      },
      (_) => this.showMessage('error', 'Error', 'An unexpected server error occurred!')
    );
  }

  async add(dataDetail) {
    
    const data: CreateCommonListInfoDto = {
      type: this.formType,
      privateType: '',
      fileFields: this.fileFields,
      isActive: true,
      data: dataDetail
    };

    this.service.addCommonListInfo(data).subscribe(
      (result) => {
        if (result && result.succeeded) {
          this.showMessage('success', 'Success', 'Add successfully');
          this.reloadData();
          this.hideDialog();
        } else {
          if (result.errors.length > 0) {
            this.showMessage('error', 'Error', result.errors[0]);
          } else {
            this.showMessage('error', 'Error', 'Add failed');
          }
        }
      },
      (_) => this.showMessage('error', 'Error', 'An unexpected server error occurred!')
    );
  }

  onDeleteEvent(item){
    this.confirmationService.confirm({
      message: 'Confirm delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteCommonListInfo(item.id).subscribe(
          (result) => {
            if (result && result.succeeded) {
              this.showMessage('success', 'Success', 'Delete successfully');
              this.reloadData();
            } else {
              if (result.errors.length > 0) {
                this.showMessage('error', 'Error', result.errors[0]);
              } else {
                this.showMessage('error', 'Error', 'Delete failed');
              }
            }
          },
          (_) => this.showMessage('error', 'Error', 'An unexpected server error occurred!')
        );
      },
    });
  }
  

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
