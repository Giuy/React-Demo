import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AttachmentService } from 'app/services/attachment.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
})
export class FormDialogComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  @Input() width: string;
  @Input() formName: string;
  @Input() editMode: boolean;
  @Input() uploadService: string;
  
  @Output() submitEvent = new EventEmitter<any>();

  formDetail: FormGroup;
  arrField = [];
  arrFileData = [];
  arrMultipleFileData = [];
  imageIndex = 0;
  showDialog = false;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private attachmentService: AttachmentService,
  ) {}

  ngOnInit() {
    
  }

  initFormDetail(arrFieldParam: Array<any>) {
    this.arrFileData = [];
    this.arrField = arrFieldParam;
    this.formDetail = this.fb.group({});
    for (let index = 0; index < this.arrField.length; index++) {
      if (this.arrField[index].fieldType == 'file') {
        const fileInfo = {
          fileUrl: '',
          filePath: '',
          fileName: '',
          fileSize: 0,
        };
        this.formDetail.addControl(this.arrField[index].fieldId, new FormControl(fileInfo));
      }
      else if (this.arrField[index].fieldType == 'multipleImage') {
        this.formDetail.addControl(this.arrField[index].fieldId, new FormControl([]));
      }
      else if (this.arrField[index].fieldType == 'chips') {
        this.formDetail.addControl(this.arrField[index].fieldId, new FormControl([]));
      }
      else{
        if (this.arrField[index].required == true) {
          this.formDetail.addControl(this.arrField[index].fieldId, new FormControl(this.getDefaultValue(this.arrField[index]), Validators.required));
        } 
        else {
          this.formDetail.addControl(this.arrField[index].fieldId, new FormControl(this.getDefaultValue(this.arrField[index])));
        }
      }
    }
      
  }

  getDefaultValue(field){
    if(field.defaultValue == undefined){
      if (field.fieldType == 'checkbox') {
        return false;
      }
      else if (field.fieldType == 'number' || field.fieldType == 'positiveNumber') {
        return 0;
      }
    }
    else{
      return field.defaultValue;
    }
    return '';
  }

  setValueForm(data: any){
    this.formDetail.patchValue(data);
  }

  setShowDialog(){
    this.showDialog = true;
  }

  setHideDialog(){
    this.showDialog = false;
  }

  async onSubmit() {
    if (this.formDetail.invalid) {
      return;
    }

    // upload file
    let uploadSuccess: boolean = await this.uploadFileProcess();
    if(uploadSuccess == false){
      return;
    }
    uploadSuccess = await this.uploadFileMultipleProcess();
    if(uploadSuccess == false){
      return;
    }

    const dataDetail = this.formDetail.value;
    this.submitEvent.emit(dataDetail)
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
        this.formDetail.get(fileData.id).setValue({
          fileUrl: e.target.result,
          filePath: '',
          fileName: fileData.fileInfo.fileName,
          fileSize: fileData.fileInfo.size
        });
      }; 
      reader.readAsDataURL(file);
    }
  }

  removeFileInfoDB(id: string){
    let fileInfoDB = this.getFileInfoById(id);
    if(fileInfoDB != undefined){
      this.formDetail.get(id).setValue(
      {
        fileUrl: '',
        filePath: '',
        fileName: '',
        fileSize: 0
      });
    }
  }

  getFileInfoById(id: string){
    let fileInfo = this.formDetail.get(id).value;
    return fileInfo;
  }
  getFileUrlById(id: string){
    let fileInfo = this.formDetail.get(id).value;
    
    return fileInfo == undefined ? "" : fileInfo.fileUrl;
  }

  chooseFileMany(event, id){
    event.preventDefault();
    document.getElementById(id).click();
  }

  onFileChangeMany(event,id: string) {
    const arrFile = this.formDetail.get(id).value;
    this.imageIndex++;

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileInfo = {
        data: file,
        fileName: file.name,
        size: Math.round(file.size / 1024),
        type: file.type
      };

      const reader = new FileReader();
      reader.onload = (e)=>{
        var item = {
          id: this.imageIndex,
          fileInfo: fileInfo,
          imageName: file.name,
          imageUrl: e.target.result,
        };

        arrFile.push(item);
        this.formDetail.get(id).setValue(arrFile);
      }; 
      reader.readAsDataURL(file);
    }
  }

  getMultipleImage(id){
    return this.formDetail.get(id).value;
  }

  removeImageItem(item, fieldId: string) {
    let arrFile = this.getMultipleImage(fieldId);
    arrFile = arrFile.filter((x) => x.id != item.id);
    this.formDetail.get(fieldId).setValue(arrFile);
  }

  async uploadFileProcess(){
    for (let i = 0; i < this.arrFileData.length; i++) {
      const fileData = this.arrFileData[i];
      if(fileData.fileInfo != undefined){
        try{
          const result = await this.attachmentService.uploadImage(fileData.fileInfo, this.uploadService).toPromise();
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

  async uploadFileMultipleProcess(){
    const arrField = this.arrField.filter((element)=>{
      return element.fieldType == 'multipleImage';
    });

    for (let index = 0; index < arrField.length; index++) {
      const fieldId = arrField[index].fieldId;
      const arrFile = this.getMultipleImage(fieldId);
      
      for (let i = 0; i < arrFile.length; i++) {
        if(arrFile[i].fileInfo != undefined){
          try{
            const result = await this.attachmentService.uploadImage(arrFile[i].fileInfo, this.uploadService).toPromise();
            if (result.succeeded) {
              const { fileName, fileUrl, filePath, fileSize } = result.objectReturn;
              arrFile[i] = {
                fileUrl: fileUrl,
                filePath: filePath,
                fileName: fileName,
                fileSize: fileSize
              };
              
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
      this.formDetail.get(fieldId).setValue(arrFile);
    }
    return true;
  }

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }

  handleCkChange(value, title) {
    this.formDetail.get(title).setValue(value);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
