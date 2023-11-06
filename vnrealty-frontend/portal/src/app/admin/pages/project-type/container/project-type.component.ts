import { CreateProjectTypeDto } from '../../../../api-clients/general-client';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService, States } from 'app/services/state.service';
import { ProjectService } from 'app/services/project.service';
import { AttachmentService } from 'app/services/attachment.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectTypeDto } from 'app/api-clients/general-client';

@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProjectTypeComponent implements OnInit, OnDestroy {
  cols: any[];
  dialog = false;
  submitted = false;
  arrProjectType: ProjectTypeDto[];
  form: FormGroup;
  editMode = false;
  fileData: any;

  get nameVi() {
    return this.form.get('nameVi');
  }

  get nameEn() {
    return this.form.get('nameEn');
  }

  get descriptionsVi() {
    return this.form.get('descriptionsVi');
  }

  get descriptionsEn() {
    return this.form.get('descriptionsEn');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  get isActived() {
    return this.form.get('isActived');
  }

  private destroyed$ = new Subject<void>();
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private stateService: StateService,
    private service: ProjectService,
    private attachmentService: AttachmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initCols();
    this.getAllProjectType();

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      code: [''],
      nameVi: ['', [Validators.required, Validators.maxLength(200)]],
      nameEn: ['', [Validators.required, Validators.maxLength(200)]],
      descriptionsVi: [''],
      descriptionsEn: [''],
      imageUrl: [''],
      imagePath: [''],
      isActived: [false],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.editMode) {
      this.editProjectType();
    } else {
      this.addProjectType();
    }
  }

  getAllProjectType() {
    this.service
      .getAllProjectType()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.arrProjectType = data;
          }
        },
        (error) => {
          this.arrProjectType = [];
        }
      );
  }

  reloadData() {
    this.arrProjectType = [];
    this.service.getAllProjectType().subscribe((data) => {
      this.arrProjectType = data;
    });
  }

  initCols() {
    this.cols = [
      { field: 'nameVi', header: 'Name' },
      { field: 'imageUrl',header: 'Image'},
      {
        field: 'description',
        header: 'Descriptions',
      },
      { field: 'isActived', header: 'Active' },
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

  async editProjectType() {
    // upload file
    if(this.fileData != undefined){
      const uploadSuccess = await this.uploadFileProcess();
      if(uploadSuccess == false){
        return;
      }
    }
    this.service.editProjectType(this.form.value.id, this.form.value).subscribe(
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
      (err) => {
        var message = err ? err : 'An unexpected server error occurred!';
        this.showMessage('error', 'Error', message);
      }
    );
  }

  async addProjectType() {
    // upload file
    if(this.fileData != undefined){
      const uploadSuccess = await this.uploadFileProcess();
      if(uploadSuccess == false){
        return;
      }
    }
    
    const data = Object.assign({}, this.form.value);
    this.service.addProjectType(data).subscribe(
      (result) => {
        if (result && result.succeeded) {
          this.showMessage('success', 'Success', 'Add Successfully!');
          this.reloadData();
          this.hideDialog();
        } else {
          if (result.errors.length > 0) {
            this.showMessage('error', 'Error', result.errors[0]);
          } else {
            this.showMessage('error', 'Error', 'Add failed!');
          }
        }
      },
      (err) => {
        var message = err ? err : 'An unexpected server error occurred!';
        this.showMessage('error', 'Error', message);
      }
    );
  }

  deleteProjectType(item) {
    this.confirmationService.confirm({
      message: 'Confirm delete ' + item.nameVi + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteProjectType(item.id).subscribe(
          (result) => {
            if (result && result.succeeded) {
              this.showMessage('success', 'Success', 'Delete Successfully!');
              this.reloadData();
            } else {
              if (result.errors.length > 0) {
                this.showMessage('error', 'Error', result.errors[0]);
              } else {
                this.showMessage('error', 'Error', 'Delete failed!');
              }
            }
          },
          (err) => {
            var message = err ? err : 'An unexpected server error occurred!';
            this.showMessage('error', 'Error', message);
          }
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
      const result = await this.attachmentService.uploadProjectImage(this.fileData).toPromise();
      if (result.succeeded) {
        const { fileName, fileUrl, filePath } = result.objectReturn;
        this.form.patchValue({
          imageUrl: fileUrl,
        });
        this.form.patchValue({
          imagePath: filePath,
        })
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

  handleChangeActive(value, item: ProjectTypeDto, key: string) {
    if (key == 'isActived') {
      item.isActived = value.checked;
    }
    this.form.patchValue({
      ...item,
    });
    this.editProjectType();
  }
}
