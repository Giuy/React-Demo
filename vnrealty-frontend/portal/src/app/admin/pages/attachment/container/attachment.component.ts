import { Result } from '../../../../api-clients/general-client';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { StateService, States } from 'app/services/state.service';
import { PhotoService } from 'app/services/photo.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { NewsCategoryDto, NewsDto } from 'app/api-clients/news-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  FileParameter, PhotoDto,AttachmentType,UpdateAttachmentInfoDto,AttachmentDto } from 'app/api-clients/general-client';
import { BannerService } from 'app/services/banner.service';
import { AttachmentService } from 'app/services/attachment.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AttachmentComponent implements OnInit, OnDestroy {
  cols: any[];
  dialog = false;

  submitted = false;
  listAttachments: AttachmentDto[];
  form: FormGroup;
  editMode = false;
  fileAccept = "";
  fileData: any;
  isUpload = false;
  uploadValue = 0;

  attachmentTypeList = [
    {
      name: 'Photo',
      value: AttachmentType.Photo
    },
    {
      name: 'Video',
      value: AttachmentType.Video
    },
    {
      name: 'Audio',
      value: AttachmentType.Audio
    }
  ];

  get isActived() {
    return this.form.get('isActived');
  }

  get fileUrl() {
    return this.form.get('fileUrl');
  }

  get order() {
    return this.form.get('order');
  }

  get attachmentType() {
    return this.form.get('attachmentType');
  }

  private destroyed$ = new Subject<void>();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private stateService: StateService,
    // private service: BannerService,
    private attachmentService: AttachmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initCols();
    this.reloadData();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      attachmentType:[0,Validators.required],
      filePath: [''],
      fileUrl: ['',Validators.required],
      caption1: [''],
      caption2: [''],
      note: [''],
      ordinal: [1]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.add();
  }

  reloadData() {
    this.listAttachments = [];
    this.attachmentService
      .getByListAttachmentType([AttachmentType.Photo,AttachmentType.Video,AttachmentType.Audio,AttachmentType.File3D])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.listAttachments = data;
          }
        },
        (error) => {
          this.listAttachments = [];
        }
      );
  }

  initCols() {
    this.cols = [
      {
        field: 'attachmentType',
        header: 'Attachment type',
        width: '120px'
      },
      {
        field: 'fileName',
        header: 'File name',
        width: '200px'
      },
      {
        field: 'fileSize',
        header: 'Size (kB)',
        width: '150px'
      },
      {
        field: 'fileUrl',
        header: 'Review',
        width: '100px'
      },
      {
        field: 'caption1',
        header: 'Caption 1',
        width: '200px'
      },
      {
        field: 'caption2',
        header: 'Caption 2',
        width: '200px'
      },
      {
        field: 'note',
        header: 'Descriptions',
        width: '300px'
      },
      {
        field: 'ordinal',
        header: 'Position',
        width: '100px'
      },
      { field: 'created', header: 'Created date', width: '200px' }
    ];
  }

  openNew() {
    this.editMode = false;
    this.submitted = false;
    this.initForm();
    this.dialog = true;
   
  }

  hideDialog() {
    this.dialog = false;
    this.dialog = false;
    this.submitted = false;
  }

  add() {
    if(this.fileData == undefined){
      this.showMessage('error', 'Error', 'Please select a attachment')
      return;
    }

    const attachmentType = this.form.value.attachmentType;
    this.isUpload = true;
    this.uploadValue = 0;
    this.attachmentService.uploadFileWithProgress(attachmentType,this.fileData).subscribe(
      (event: any)=>{
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            var eventTotal = event.total ? event.total : 0;
            var progress = Math.round(event.loaded / eventTotal * 100);
            this.uploadValue = progress;
            console.log(`Uploaded! ${progress}`);
            break;
          case HttpEventType.Response:
            console.log('Image Upload Successfully!', event.body);
            setTimeout(()=>{
              this.uploadValue = 100;
              this.isUpload = false;
              const result: Result = event.body;
              if (result.succeeded) {
                const dataUpdate: UpdateAttachmentInfoDto  = Object.assign({}, this.form.value);
                dataUpdate.id = result.objectReturn.id;
                
                this.attachmentService.updateInfo(dataUpdate).subscribe((updateResult)=>
                {
                  this.showMessage('success', 'Success', 'Add successfully!');
                  this.reloadData();
                  this.hideDialog();
                });
              }
              else{
                console.log(result);
                this.showMessage('error', 'Error', result.errors[0]);
              }

            },1000);
            
    
        }
      },(e) => {
        console.log(e);
        this.isUpload = false;
        this.showMessage('error', 'Error', 'Upload failed!');
      }
    );
  }

  delete(item) {
    this.confirmationService.confirm({
      message: 'Confirm delete ' + item.fileName + '?',
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.attachmentService.deleteFile(item.id).subscribe(
          (result) => {
            if (result && result.succeeded) {
              this.showMessage('success', 'Success', 'Delete successfully!');
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

  getAttachmentTypeName(val: AttachmentType){
    if(val == AttachmentType.Photo){
      return "Photo";
    }
    else if(val == AttachmentType.Video){
      return "Video";
    }
    else{
      return "Undefined";
    }
  }

  chooseFile(event){
    event.preventDefault();
    document.getElementById('file').click();
  }

  onFileChange(event) {
    this.fileData = null;
    this.form.patchValue({
      fileUrl: ''
    });

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileData = {
        data: file,
        fileName: file.name,
        size: file.size / 1000,
        type: file.type
      };
      this.form.patchValue({
        fileUrl: file.name
      });
    }
  }

  removeFile(){
    this.fileData = null;
    this.form.patchValue({
      fileUrl: ''
    });
    const element: any = document.getElementById('file');
    element.value = '';
  }

  onAttachmentTypeChange(value){
    if(value == AttachmentType.Photo){
      this.fileAccept = "image/*";
      this.form.patchValue({
        attachmentType: AttachmentType.Photo
      });
    }
    else if(value == AttachmentType.Video){
      this.fileAccept = "video/mp4";
      this.form.patchValue({
        attachmentType: AttachmentType.Video
      });
    }
    else if(value == AttachmentType.File3D){
      this.fileAccept = ".glb";
      this.form.patchValue({
        attachmentType: AttachmentType.File3D
      });
    }
    else{
      this.fileAccept = "";
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
