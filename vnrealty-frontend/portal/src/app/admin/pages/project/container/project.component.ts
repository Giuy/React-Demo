import { ProjectTypeDto,ProjectImageDto } from '../../../../api-clients/general-client';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService, States } from 'app/services/state.service';
import { PhotoService } from 'app/services/photo.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectDto, CreateProjectDto} from 'app/api-clients/general-client';
import { ProjectService } from 'app/services/project.service';
import { AttachmentService } from 'app/services/attachment.service';
import * as moment from 'moment';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProjectComponent implements OnInit, OnDestroy {
  cols: any[];
  dialog = false;

  submitted = false;
  listProject: ProjectDto[];
  listProjectType: ProjectTypeDto[];
  projectImages = [] as any;

  form: FormGroup;
  editMode = false;
  fileData: any;

  get projectNameVi() {
    return this.form.get('projectNameVi');
  }

  get projectNameEn() {
    return this.form.get('projectNameEn');
  }

  get projectCode() {
    return this.form.get('projectCode');
  }

  get shortDescriptionsVi() {
    return this.form.get('shortDescriptionsVi');
  }

  get shortDescriptionsEn() {
    return this.form.get('shortDescriptionsEn');
  }

  get descriptionsVi() {
    return this.form.get('descriptionsVi');
  }

  get descriptionsEn() {
    return this.form.get('descriptionsEn');
  }

  get projectTypeId() {
    return this.form.get('projectTypeId');
  }

  get price() {
    return this.form.get('price');
  }

  get hightlightProject() {
    return this.form.get('hightlightProject');
  }

  get isActived() {
    return this.form.get('isActived');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  get keyword() {
    return this.form.get('keyword');
  }

  get dimensions() {
    return this.form.get('dimensions');
  }



  private destroyed$ = new Subject<void>();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: ProjectService,
    private attachmentService: AttachmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initCols();
    this.loadData();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      projectCode: ['', Validators.required],
      projectNameVi: ['', Validators.required],
      projectNameEn: ['', Validators.required],
      shortDescriptionsVi: ['', Validators.required],
      shortDescriptionsEn: ['', Validators.required],
      descriptionsVi: [''],
      descriptionsEn: [''],
      imageUrl: ['',Validators.required],
      imagePath: [''],
      hightlightProject: [false],
      price: [0],
      dimensions: [''],
      address: [''],
      isActived: [false],
      friendlyUrl: [''],
      arrKeyword: [[]],
      keyword: [''],
      startDate: [new Date()],
      finishedDate: [new Date()],
      projectTypeId:  ['', Validators.required],
      projectImages: [[]]
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
      this.onAdd();
    }
  }

  getProjectById(id: string) {
    this.service
      .getProjectById(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: ProjectDto) => {
        if (res) {
          res.startDate = res.startDate != undefined ? new Date(res.startDate) : undefined;
          res.finishedDate = res.finishedDate != undefined ? new Date(res.finishedDate) : undefined;
          
          this.form.patchValue({
            ...res,
          });
          let arrKeyword = [];
          if(res.keyword != ""){
            arrKeyword = res.keyword.split(',');
          }
          this.form.patchValue({
            arrKeyword: arrKeyword
          });
          this.projectImages = res.projectImages;
          
        } else {
          this.editMode = false;
        }
      });
  }

  reloadData() {
    this.listProject = [];
    this.service
      .getAllProject()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.listProject = data;
          }
        },
        (error) => {
          this.listProject = [];
        }
      );
  }

  loadData() {
    this.reloadData();
    this.getProjectTypeList();
  }

  getProjectTypeList() {
    this.service
      .getAllProjectType()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.listProjectType = data;
          }
        },
        (error) => {
          this.listProjectType = [];
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
        field: 'projectNameVi',
        header: 'Project Name',
      },
      {
        field: 'projectCode',
        header: 'Project Code',
      },
      {
        field: 'projectTypeName',
        header: 'Project Type',
      },
      {
        field: 'address',
        header: 'Address',
      },
      {
        field: 'isActived',
        header: 'Active',
      },
      { field: 'created', header: 'Created Date' },
    ];
  }

  openNew() {
    this.editMode = false;
    this.submitted = false;
    this.dialog = true;
    this.projectImages = [];
    this.initForm();
  }

  hideDialog() {
    this.dialog = false;
    this.dialog = false;
    this.submitted = false;
  }

  openEdit(id: string) {
    this.editMode = true;
    this.submitted = false;
    this.dialog = true;
    this.getProjectById(id);
  }

  async onEdit() {
    // upload file
    const uploadSuccess = await this.uploadFileProcess();
    if(uploadSuccess == false){
      return;
    }
    const listImage = await this.uploadMultipleFileProcess();

    const data = Object.assign({}, this.form.value);
    
    if(data.startDate != ""){
      data.startDate = moment(data.releaseDate).format("yyyy-MM-DD");
    }
    if(data.finishedDate != ""){
      data.finishedDate = moment(data.finishedDate).format("yyyy-MM-DD");
    }
    data.projectImages = listImage;
    if(data.arrKeyword.length > 0){
      data.keyword = data.arrKeyword.join(",");
    }

    this.service.updateProject(data.id, data).subscribe(
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
      (err) => {
        this.showMessage('error', 'Error', 'An unexpected server error occurred!');
      }
    );
  }

  async onAdd() {
    // upload file
    const uploadSuccess = await this.uploadFileProcess();
    if(uploadSuccess == false){
      return;
    }
    const listImage = await this.uploadMultipleFileProcess();

    const data = Object.assign({}, this.form.value);
    if(data.startDate != ""){
      data.startDate = moment(data.releaseDate).format("yyyy-MM-DD");
    }
    if(data.finishedDate != ""){
      data.finishedDate = moment(data.finishedDate).format("yyyy-MM-DD");
    }
    data.projectImages = listImage;
    if(data.arrKeyword.length > 0){
      data.keyword = data.arrKeyword.join(",");
    }
    
    this.service.addProject(data).subscribe(
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
      (err) => {
        this.showMessage('error', 'Error', 'An unexpected server error occurred!');
      }
    );
  }

  onDelete(item) {
    this.confirmationService.confirm({
      message: 'Confirm delete ' + item.caption + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteProject(item.id).subscribe(
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
          (err) => {
            this.showMessage('error', 'Error', 'An unexpected server error occurred!');
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
    if(this.fileData == undefined){
      return true;
    }
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

  async uploadMultipleFileProcess(){
    const listImages: ProjectImageDto[] = [];
    for (let index = 0; index < this.projectImages.length; index++) {
      const element = this.projectImages[index];
      if(element.fileData == undefined){
        listImages.push({
          imageName: element.imageName,
          imagePath: element.imagePath,
          imageUrl: element.imageUrl
        });
        continue;
      }
      const result = await this.attachmentService.uploadProjectImage(element.fileData).toPromise();
      if(result.succeeded){
        listImages.push({
          imageName: result.objectReturn.fileName,
          imagePath: result.objectReturn.filePath,
          imageUrl: result.objectReturn.fileUrl
        });
      }
    }
    return listImages;
  }
  
  chooseFileMany(event){
    event.preventDefault();
    document.getElementById('fileMany').click();
  }

  onFileChangeMany(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      const reader = new FileReader();
      reader.onload = (e)=>{
        var item = {
          fileData: {
            data: file,
            fileName: file.name,
          },
          imageName: file.name,
          imageUrl: e.target.result,
        };

        this.projectImages.push(item);
      }; 
      reader.readAsDataURL(file);
    }
  }

  removeImageItem(item) {
    this.projectImages = this.projectImages.filter((x) => x.imageUrl != item.imageUrl);
  }

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleValueCkChange(value, key: string) {
    if (key == 'contentVi') {
      this.form.patchValue({
        contentVi: value,
      });
    }
    if (key == 'contentEn') {
      this.form.patchValue({
        contentEn: value,
      });
    }
  }

  handleChangeActive(value, item: ProjectDto, key: string) {
    if (key == 'isActived') {
      item.isActived = value.checked;
    }
    if (key == 'hightlightProduct') {
      item.hightlightProject = value.checked;
    }
    this.form.patchValue({
      ...item,
    });
    this.onEdit();
  }
}
