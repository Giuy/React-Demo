import { MasterDataDto,CreateMasterDataDto } from '../../../../api-clients/general-client';
import { Component, OnInit,AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService, States } from 'app/services/state.service';
import { PhotoService } from 'app/services/photo.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { NewsCategoryDto, NewsDto } from 'app/api-clients/news-client';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MasterDataTypeDto } from 'app/api-clients/general-client';
import { MasterDataService } from 'app/services/master-data.service';
import { FormDialogComponent } from 'app/admin/components/form-dialog/form-dialog.component'
import { FormTableComponent } from 'app/admin/components/form-table/form-table.component'

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class MasterDataComponent implements OnInit,AfterViewInit, OnDestroy {
  cols: any[];

  submitted = false;
  listCommonListInfo: MasterDataDto[];
  editMode = false;
  arrGroupField = [];
  dataId = "";

  formName = "";
  dialogName = "";
  fileFields = [];
  maxRow = 0;
  arrMasterDataType: Array<MasterDataTypeDto> = [];
  masterDataType = null;
  valueField = "";
  nameField = "";

  private destroyed$ = new Subject<void>();
  @ViewChild(FormDialogComponent) formDialog: FormDialogComponent;
  @ViewChild(FormTableComponent) formTable: FormTableComponent;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: MasterDataService
  ) {}
  

  ngOnInit() {
    this.getMasterDataType();
  }

  ngAfterViewInit(): void {
    //this.formTable.setArrField(this.arrGroupField);
  }

  createFieldConfig(){
    this.formName = this.masterDataType.name;
    this.dialogName = this.masterDataType.name;
    this.maxRow = 0;

    if(this.masterDataType.name == "Features City"){
      this.arrGroupField = [
        {fieldId: 'title', fieldName: 'Title', showOnGrid: true, required: true,width: '14rem', fieldType: 'text'},
        {fieldId: 'subtitle', fieldName: 'Sub Title',showOnGrid: true, required: false,width: '14rem', fieldType: 'text'},
        {fieldId: 'coverimage', fieldName: 'Cover Image', showOnGrid: true, required: true,width: '10rem', fieldType: 'image'},
        {fieldId: 'isActive', fieldName: 'Active', showOnGrid: true, required: false,width: '6rem', fieldType: 'checkbox'},
      ];
      this.nameField = "title";
    }
    else if(this.masterDataType.name == "Property Type"){
      this.arrGroupField = [
        {fieldId: 'name', fieldName: 'Name', showOnGrid: true, required: true,width: '14rem', fieldType: 'text'},
        {fieldId: 'code', fieldName: 'Code', showOnGrid: true, required: true,width: '14rem', fieldType: 'text'},
        {fieldId: 'description', fieldName: 'Description', showOnGrid: false, required: false,width: '5rem', fieldType: 'textArea'},
        {fieldId: 'isActive', fieldName: 'Active', showOnGrid: true, required: false,width: '6rem', fieldType: 'checkbox'},
      ];
      this.nameField = "name";
    }
    else if(this.masterDataType.name == "Price Range Filter" || this.masterDataType.name == "Property Area Filter"){
      this.maxRow = 1;
      this.arrGroupField = [
        {fieldId: 'minValue', fieldName: 'Min Value', showOnGrid: true, required: true,width: '14rem', fieldType: 'positiveNumber'},
        {fieldId: 'maxValue', fieldName: 'Max Value', showOnGrid: true, required: true,width: '14rem', fieldType: 'positiveNumber'},
      ];
    }

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
    this.service
      .getMasterDataByType(this.masterDataType.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.listCommonListInfo = data;
            
            this.formTable.setListData(this.listCommonListInfo);
          }
        },
        (error) => {
          this.listCommonListInfo = [];
        }
      );
  }

  async getMasterDataType(){
    this.arrMasterDataType = await this.service.getAllMasterDataType().toPromise();
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
    const data: CreateMasterDataDto = {
      masterDataTypeId: this.masterDataType.id,
      fileFields: this.fileFields,
      isActive: dataDetail["isActive"],
      name: dataDetail[this.nameField],
      data: dataDetail
    };

    this.service.editMasterData(this.dataId, data).subscribe(
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
    
    const data: CreateMasterDataDto = {
      masterDataTypeId: this.masterDataType.id,
      fileFields: this.fileFields,
      isActive: dataDetail["isActive"],
      name: dataDetail[this.nameField],
      data: dataDetail
    };

    this.service.addMasterData(data).subscribe(
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
        this.service.deleteMasterData(item.id).subscribe(
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
  onMasterDataTypeChange(value){
    if(value != undefined){
      this.createFieldConfig();
      setTimeout(() => {
        this.formTable.setArrField(this.arrGroupField);
      }, 100);
      
      
      this.reloadData();
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
