import { CustomerReviewDto,CreateCustomerReviewDto } from '../../../../api-clients/general-client';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService, States } from 'app/services/state.service';
import { PhotoService } from 'app/services/photo.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { NewsCategoryDto, NewsDto } from 'app/api-clients/news-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  } from 'app/api-clients/general-client';
import { CustomerReviewService } from 'app/services/customer-review.service';
import { AttachmentService } from 'app/services/attachment.service';


@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CustomerReviewComponent implements OnInit, OnDestroy {
  cols: any[];
  dialog = false;

  submitted = false;
  listCustomerReview: CustomerReviewDto[];
  form: FormGroup;
  editMode = false;
  fileData: any;

  get title() {
    return this.form.get('title');
  }

  get titleEn() {
    return this.form.get('titleEn');
  }

  get customerName() {
    return this.form.get('customerName');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  get order() {
    return this.form.get('order');
  }



  private destroyed$ = new Subject<void>();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private stateService: StateService,
    private service: CustomerReviewService,
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
      title : ['',Validators.required],
      titleEn: ['',Validators.required],
      subTitle: [''],
      subTitleEn: [''],
      customerName: ['', Validators.required],
      company: [''],
      rating: [0],
      order: [1],
      comment: [''],
      commentEn: [''],
      imageUrl: ['', Validators.required],
      imagePath: [''],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.editMode) {
      this.onEdit();
    } else {
      this.add();
    }
  }

  reloadData() {
    this.listCustomerReview = [];
    this.service
      .getAllCustomerReview()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.listCustomerReview = data;
          }
        },
        (error) => {
          this.listCustomerReview = [];
        }
      );
  }

  initCols() {
    this.cols = [
      {
        field: 'imageUrl',
        header: 'Image',
      },
      {
        field: 'title',
        header: 'Title',
      },
      {
        field: 'customerName',
        header: 'Customer Name',
      },
      {
        field: 'rating',
        header: 'Rating',
      },
      {
        field: 'order',
        header: 'Order',
      },
      
      { field: 'created', header: 'Created date' }
    ];
  }

  openNew() {
    this.editMode = false;
    this.submitted = false;
    this.dialog = true;
    this.fileData = null;
    this.initForm();
  }

  hideDialog() {
    this.dialog = false;
    this.dialog = false;
    this.submitted = false;
  }

  openEdit(item) {
    this.editMode = true;
    this.submitted = false;
    this.dialog = true;
    this.fileData = null;
    this.form.patchValue(item);
  }

  async onEdit() {
    let changeImage = false;
    // upload file
    if(this.fileData != undefined){
      const uploadSuccess = await this.uploadFileProcess();
      changeImage = true;
      if(uploadSuccess == false){
        return;
      }
    }
    this.form.patchValue({
      changeImage: changeImage
    });

    this.service.editCustomerReview(this.form.value.id, this.form.value).subscribe(
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

  async add() {
    // upload file
    const uploadSuccess = await this.uploadFileProcess();
    if(uploadSuccess == false){
      return;
    }

    const data = Object.assign({}, this.form.value);
    
    this.service.addCustomerReview(data).subscribe(
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

  delete(item) {
    this.confirmationService.confirm({
      message: 'Confirm delete ' + item.caption + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteCustomerReview(item.id).subscribe(
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
  chooseFile(event){
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
      reader.onload = (e)=>{
        this.form.patchValue({
          imageUrl: e.target.result
        });
      }; 
      reader.readAsDataURL(file);
    }
  }

  async uploadFileProcess(){
    let success = false;
    try{
      const result = await this.attachmentService.uploadBanner(this.fileData).toPromise();
      if (result.succeeded) {
        const { fileName, fileUrl, filePath } = result.objectReturn;
        this.form.patchValue({
          imageUrl: fileUrl,
        });
        this.form.patchValue({
          imagePath: filePath,
        })
        this.form.patchValue({
          imageName: fileName,
        });
        success = true;
      }
      else{
        this.showMessage('error', 'Error', result.errors[0]);
      }
    }
    catch(err){
      this.showMessage('error', 'Error', 'Upload image failed!');
    }

    return success;
  }
  

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
