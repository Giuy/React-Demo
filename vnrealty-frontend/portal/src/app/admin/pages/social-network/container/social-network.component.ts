import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService, States } from 'app/services/state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialNetworkDto, SocialNetworkTypeDto } from 'app/api-clients/general-client';
import { SocialNetworkService } from 'app/services/social-network.service';
import { AttachmentService } from 'app/services/attachment.service';

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class SocialNetworkComponent implements OnInit, OnDestroy {
  cols: any[];
  dialog = false;
  submitted = false;
  selectedItems: SocialNetworkDto[];
  socialNetworks: SocialNetworkDto[];
  socialNetworkTypes: SocialNetworkTypeDto[];
  form: FormGroup;
  editMode = false;
  fileData: any;

  get linkUrl() {
    return this.form.get('linkUrl');
  }

  get socialNetworkTypeName() {
    return this.form.get('socialNetworkTypeName');
  }

  get descriptions() {
    return this.form.get('descriptions');
  }

  get name() {
    return this.form.get('name');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  private destroyed$ = new Subject<void>();
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private stateService: StateService,
    private service: SocialNetworkService,
    private attachmentService: AttachmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initCols();
    this.getAllSocialNetwork();
    this.getAllSocialNetworkTypes();

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      name: ['',[Validators.required]],
      linkUrl: [''],
      socialNetworkTypeName: [''],
      descriptions: [''],
      imageUrl: ['',[Validators.required]],
      imagePath: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.editMode) {
      this.edit();
    } else {
      this.add();
    }
  }

  getAllSocialNetwork() {
    this.service
      .getAllSocialNetwork()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.socialNetworks = data;
          }
        },
        (error) => {
          this.socialNetworks = [];
        }
      );
  }

  getAllSocialNetworkTypes() {
    this.service
      .getAllSocialNetworkType()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.socialNetworkTypes = data;
          }
        },
        (error) => {
          this.socialNetworkTypes = [];
        }
      );
  }

  reloadData() {
    this.service.getAllSocialNetwork().subscribe((data) => {
      this.socialNetworks = data;
    });
  }

  initCols() {
    this.cols = [
      { field: 'name', header: 'Application name' },
      { field: 'imageUrl', header: 'Image' },
      { field: 'linkUrl', header: 'Link' },
      { field: 'descriptions', header: 'Descriptions' },
      { field: 'created', header: 'Created Date' },
    ];
  }

  openNew() {
    this.editMode = false;
    this.submitted = false;
    this.dialog = true;
    this.initForm();
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  openEdit(item) {
    this.editMode = true;
    this.submitted = false;
    this.dialog = true;
    this.form.patchValue(item);
  }

  async edit() {
    // upload file
    if(this.fileData != undefined){
      const uploadSuccess = await this.uploadFileProcess();
      if(uploadSuccess == false){
        return;
      }
    }
    
    this.service.editSocialNetwork(this.form.value.id, this.form.value).subscribe(
      (result) => {
        if (result && result.succeeded) {
          this.showMessage('success', 'Success', 'Update Successfully!');
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
    this.service.addSocialNetwork(data).subscribe(
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
        this.service.deleteSocialNetwork(item.id).subscribe(
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
          (_) => this.showMessage('error', 'Thất bại', 'Có lỗi trong quá trình xóa!')
        );
      },
    });
  }

  getImageUrl(item: SocialNetworkDto){
    if(item.imageUrl == undefined || item.imageUrl == ""){
      return "assets/img/NoImg.jpg";
    }
    return item.imageUrl;
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
