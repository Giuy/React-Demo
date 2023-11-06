import { Component, OnInit, OnDestroy, Sanitizer } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule} from 'primeng/calendar';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonConfigDto, CreateCommonConfigDto } from 'app/api-clients/general-client';
import { CommonConfigService } from 'app/services/common-config.service';
import { AttachmentService } from 'app/services/attachment.service';

@Component({
  selector: 'app-common-config',
  templateUrl: './common-config.component.html',
  styleUrls: ['./common-config.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CommonConfigComponent implements OnInit, OnDestroy {
  submitted = false;
  form: FormGroup;
  showForm: boolean = false;
  arrCommonConfigType = [];
  arrGroupField = [];
  formDetail: FormGroup;
  arrFileData = [];
  arrFilePathDelete = [];

  get titleVi() {
    return this.form.get('titleVi');
  }

  get titleEn() {
    return this.form.get('titleEn');
  }

  get descriptionsVi() {
    return this.form.get('descriptionsVi');
  }

  get descriptionsEn() {
    return this.form.get('descriptionsEn');
  }

  get contentVi() {
    return this.form.get('contentVi');
  }

  get contentEn() {
    return this.form.get('contentEn');
  }

  get commonConfigType(){
    return this.form.get('commonConfigType');
  }

  private destroyed$ = new Subject<void>();
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: CommonConfigService,
    private attachmentService: AttachmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.getListCommonConfigType();
    //this.createFieldConfig();
    //this.reloadData();
  }

  initForm() {
    
    this.form = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      commonConfigType: [null]
    });
    
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.handleSubmit();
  }

  reloadData() {
    
    if(this.commonConfigType == undefined || this.commonConfigType.value == undefined){
      return;
    }
    this.arrFileData = [];
    this.arrFilePathDelete = [];
    this.createFieldConfig();
    this.service
      .getCommConfig(this.commonConfigType.value.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.formDetail.patchValue(data.data);
          }
        },
        (error) => {
          this.initForm();
        }
      );
  }

  getListCommonConfigType(){
    this.arrCommonConfigType = [
      {
        id: 'Home',
        name: 'Home',
      },
      {
        id: 'AboutUs',
        name: 'About Us',
      },
      {
        id: 'Contact',
        name: 'Contact',
      },
      {
        id: 'Footer',
        name: 'Footer',
      }
    ];
  }

  createFieldConfig(){
    this.arrGroupField = [];

    if(this.commonConfigType.value.id == "Career"){
      this.arrGroupField = [
        { 
          group: 'Titles',
          arrField: [
            {fieldId: 'title', fieldName: 'Title', fieldType: 'text'},
            {fieldId: 'titleEn', fieldName: 'Title (English)', fieldType: 'text'},
            {fieldId: 'subtitle', fieldName: 'Sub Title', fieldType: 'text'},
            {fieldId: 'subtitleEn', fieldName: 'Sub Title (English)', fieldType: 'text'},
            {fieldId: 'positions', fieldName: 'List Position', fieldType: 'chips'},
          ]
        },
        {
          group: 'Button',
          arrField: [
            {fieldId: 'buttonName', fieldName: 'Button Name', fieldType: 'text'},
            {fieldId: 'link', fieldName: 'Link', fieldType: 'text'},
          ]
        },
        {
          group: 'Descriptions',
          arrField:[
            {fieldId: 'shortDescriptions', fieldName: 'Short Descriptions', fieldType: 'textArea'},
            {fieldId: 'shortDescriptionsEn', fieldName: 'Short Descriptions (English)', fieldType: 'textArea'},
            {fieldId: 'descriptions', fieldName: 'Descriptions', fieldType: 'richText'},
            {fieldId: 'descriptionsEn', fieldName: 'Descriptions (English)', fieldType: 'richText'},
          ]
        },
        {
          group: 'Attachments',
          arrField: [
            { fieldId: 'backgroundImage', fieldName: 'Background Image', fieldType: 'file' },
            { fieldId: 'coverImage', fieldName: 'Cover Image', fieldType: 'file' },
          ]
        }
      ];
    }
    else if(this.commonConfigType.value.id == "Home"){
      this.arrGroupField = [
        {
          group: 'Welcome Info',
          arrField: [
            {fieldId: 'welcomeTitle', fieldName: 'Welcome Title', fieldType: 'text'},
            {fieldId: 'welcomeSubtitle', fieldName: 'Welcome Sub Title', fieldType: 'text'},
            {fieldId: 'welcomeShortDescriptions', fieldName: 'Welcome Short Descriptions', fieldType: 'textArea'},
            {fieldId: 'welcomeDescriptions', fieldName: 'Welcome Descriptions', fieldType: 'richText'},
          ]
        },
        {
          group: 'Our Commitment',
          arrField: [
            {fieldId: 'title', fieldName: 'Title', fieldType: 'text'},
            {fieldId: 'subtitle', fieldName: 'Sub Title', fieldType: 'text'},
            {fieldId: 'shortDescriptions', fieldName: 'Short Descriptions', fieldType: 'textArea'}
          ]
        },
        {
          group: 'Attachments',
          arrField: [
            { fieldId: 'logo', fieldName: 'Logo 1', fieldType: 'file' },
            { fieldId: 'logo2', fieldName: 'Logo 2', fieldType: 'file' },
          ]
        }
      ];
    }
    else if(this.commonConfigType.value.id == "AboutUs"){
      this.arrGroupField = [
        { 
          group: 'Missons',
          arrField: [
            { fieldId: 'missionTitle', fieldName: 'Mission Title', fieldType: 'text' },
            { fieldId: 'missionImage', fieldName: 'Mission Image', fieldType: 'file' },
            { fieldId: 'missionShortDescriptions', fieldName: 'Mission Short Descriptions', fieldType: 'textArea' },
            { fieldId: 'missionDescriptions', fieldName: 'Mission Descriptions', fieldType: 'richText' },
          ]
        },
        { 
          group: 'Visions',
          arrField: [
            { fieldId: 'visionTitle', fieldName: 'Vision Title', fieldType: 'text' },
            { fieldId: 'visionImage', fieldName: 'Vision Image', fieldType: 'file' },
            { fieldId: 'visionShortDescriptions', fieldName: 'Vision Short Descriptions', fieldType: 'textArea' },
            { fieldId: 'visionDescriptions', fieldName: 'Vision Descriptions', fieldType: 'richText' },
          ]
        },
        {
          group: 'Our Service Info',
          arrField: [
            { fieldId: 'ourServiceTitle', fieldName: 'Our Service Title', fieldType: 'text' },
            { fieldId: 'ourServiceImage', fieldName: 'Our Service Image', fieldType: 'file' },
          ]
        },
        {
          group: 'Our Teams Info',
          arrField: [
            { fieldId: 'ourTeamTitle', fieldName: 'Our Teams Title', fieldType: 'text' },
            { fieldId: 'ourTeamSubtitle', fieldName: 'Our Teams Sub Title', fieldType: 'text' },
            { fieldId: 'ourTeamShortDescriptions', fieldName: 'Our Teams Short Descriptions', fieldType: 'textArea' },
          ]
        },
        {
          group: 'Our Partners Info',
          arrField: [
            { fieldId: 'ourPartnerTitle', fieldName: 'Our Partners Title', fieldType: 'text' },
            { fieldId: 'ourPartnerSubtitle', fieldName: 'Our Partners Sub Title', fieldType: 'text' },
            { fieldId: 'ourPartnerShortDescriptions', fieldName: 'Our Partners Short Descriptions', fieldType: 'textArea' },
          ]
        }
      ]
    }
    else if(this.commonConfigType.value.id == "Contact"){
      this.arrGroupField = [
        { 
          group: 'Titles',
          arrField: [
            {fieldId: 'title', fieldName: 'Title', fieldType: 'text'},
            {fieldId: 'subtitle', fieldName: 'Sub Title', fieldType: 'text'},
          ]
        },
        { 
          group: 'Locations',
          arrField: [
            {fieldId: 'area', fieldName: 'Area', fieldType: 'text'},
            {fieldId: 'address1', fieldName: 'Address 1', fieldType: 'text'},
            {fieldId: 'address2', fieldName: 'Address 2', fieldType: 'text'},
          ]
        },
        { 
          group: 'Contact Info',
          arrField: [
            {fieldId: 'phone1', fieldName: 'Phone Number 1', fieldType: 'text'},
            {fieldId: 'phone2', fieldName: 'Phone Number 2', fieldType: 'text'},
            {fieldId: 'email1', fieldName: 'Email 1', fieldType: 'text'},
            {fieldId: 'email2', fieldName: 'Email 2', fieldType: 'text'},
          ]
        },
        { 
          group: 'Working Hours',
          arrField: [
            {fieldId: 'dayOfWeek', fieldName: 'Day Of Week', fieldType: 'text'},
            {fieldId: 'workingHours', fieldName: 'Working Hours', fieldType: 'text'},
          ]
        },
        {
          group: 'Attachments',
          arrField: [
            { fieldId: 'backgroundImage', fieldName: 'Backgound Image', fieldType: 'file' }
          ]
        }
      ];
    }
    else if(this.commonConfigType.value.id == "Footer"){
      this.arrGroupField = [
        {
          group: 'Info',
          arrField: [
            {fieldId: 'title', fieldName: 'Title', fieldType: 'text'},
            {fieldId: 'subtitle', fieldName: 'Sub Title', fieldType: 'text'},
            {fieldId: 'slogan', fieldName: 'Slogan', fieldType: 'textArea'},
          ]
        }
      ];
    }
  

    this.formDetail = this.fb.group({});
    for (let index = 0; index < this.arrGroupField.length; index++) {
      this.arrGroupField[index].arrField.forEach(element => {
        if(element.fieldType == "file"){
          const fileInfo = {
            fileUrl: '',
            filePath: '',
            fileName: '',
            fileSize: 0
          };
          this.formDetail.addControl(element.fieldId, new FormControl(fileInfo));
          
        }
        else{
          this.formDetail.addControl(element.fieldId, new FormControl(''));
        }
      });
      
    }

    
  }

  async handleSubmit() {
    const uploadResult = await this.uploadFileProcess();
    if(uploadResult == false){
      return;
    }

    const data = this.form.value as CreateCommonConfigDto;
    const dataDetail = this.formDetail.value;
    data.data = dataDetail
    data.commonConfigType = this.commonConfigType.value.id;
    data.listRemoveFilePath = this.arrFilePathDelete;

    this.service
      .saveCommonConfig(data)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (result) => {
          if (result && result.succeeded) {
            this.showMessage('success', 'Success', 'Save successfully!');
            this.reloadData();
          } else {
            if (result.errors.length > 0) {
              this.showMessage('error', 'Error', result.errors[0]);
            } else {
              this.showMessage('error', 'Error', 'Save failed!');
            }
          }
        },
        (_) => this.showMessage('error', 'Error', 'Save failed!')
      );
  }

  chooseFile(event, id){
    event.preventDefault();
    document.getElementById(id).click();
  }

  onFileChange(event, id) {
    let fileData = this.arrFileData.find(x=> x.id == id);
    if(fileData == undefined){
      fileData = {
        id: id,
        fileInfo: null
      };
      this.arrFileData.push(fileData);
    }
    this.removeFileInfoDB(id);
    
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      
      fileData.fileInfo = {
        data: file,
        fileName: file.name,
        size: Math.round(file.size / 1024),
        type: file.type
      };
      const reader = new FileReader();
      reader.onload = (e)=>{
        this.form.patchValue({
          attachFile: e.target.result
        });
      }; 
      reader.readAsDataURL(file);
    }
  }
  removeFile(id: string){
    let fileData = this.getFileDataById(id);
    if(fileData != undefined){
      fileData.fileInfo = null;
      
      
      const element: any = document.getElementById(id);
      element.value = '';
    }
    
    this.removeFileInfoDB(id);
  }

  removeFileInfoDB(id: string){
    let fileInfoDB = this.getFileInfoById(id);
    if(fileInfoDB != undefined){
      this.arrFilePathDelete.push(fileInfoDB.filePath);
      this.formDetail.get(id).setValue(
      {
        fileUrl: '',
        filePath: '',
        fileName: '',
        fileSize: 0
      });
    }
  }

  async uploadFileProcess(){
    for (let i = 0; i < this.arrFileData.length; i++) {
      const fileData = this.arrFileData[i];
      if(fileData.fileInfo != undefined){
        try{
          const result = await this.attachmentService.uploadCommonConfig(fileData.fileInfo).toPromise();
          if (result.succeeded) {
            const { fileName, fileUrl, filePath, fileSize } = result.objectReturn;
            this.formDetail.get(fileData.id).setValue({
              fileUrl: fileUrl,
              filePath: filePath,
              fileName: fileName,
              fileSize: fileSize
            });
          }
          else{
            this.showMessage('error', 'Error', result.errors[0]);
            return false;
          }
        }
        catch(err){
          this.showMessage('error', 'Error', 'Upload image failed!');
          return false;
        }
      }
      
    }
    return true;
  }

  getFileDataById(id: string){
    let fileData = this.arrFileData.find(x=> x.id == id);
    return fileData;
  }
  getFileNameById(id: string){
    let fileData = this.arrFileData.find(x=> x.id == id);
    if(fileData == undefined || fileData.fileInfo == undefined){
      return "";
    }

    return fileData.fileInfo.fileName;
  }
  getFileSizeById(id: string){
    let fileData = this.arrFileData.find(x=> x.id == id);
    if(fileData == undefined || fileData.fileInfo == undefined){
      return "";
    }
    return fileData.fileInfo.size;
  }

  getFileInfoById(id: string){
    let fileInfo = this.formDetail.get(id).value;
    return fileInfo;
  }
  getFileInfoUrlById(id: string){
    let fileInfo = this.getFileInfoById(id);
    if(fileInfo == undefined){
      return "";
    }

    return fileInfo.fileUrl;
  }
  getFileInfoNameById(id: string){
    let fileInfo = this.getFileInfoById(id);
    if(fileInfo == undefined){
      return "";
    }

    return fileInfo.fileName;
  }
  getFileInfoSizeById(id: string){
    let fileInfo = this.getFileInfoById(id);
    if(fileInfo == undefined){
      return "";
    }

    return Math.round(fileInfo.fileSize / 1024);
  }

  onCommonConfigTypeChange(value){
    this.reloadData();
  }

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleCkChange(value, title) {
    this.formDetail.get(title).setValue(value);
  }

  onChangeType(event) {
    this.reloadData();
  }
}
