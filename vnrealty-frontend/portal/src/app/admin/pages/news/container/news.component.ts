import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import { StateService, States } from 'app/services/state.service';
import { NewsService } from 'app/services/news.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsCategoryDto, NewsDto, SearchingNewsDto, CreateNewsDto, AttachmentType,NewsImageDto } from 'app/api-clients/general-client';
import { AttachmentService } from 'app/services/attachment.service';
import * as moment from 'moment';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class NewsComponent implements OnInit, OnDestroy {
  cols: any[];
  dialog = false;

  submitted = false;
  selectedItems: NewsDto[];
  listNews: NewsDto[];
  form: FormGroup;
  editMode = false;
  newsCategories: NewsCategoryDto[] = [];
  searchingModel: SearchingNewsDto = {
    title: '',
    featured: undefined,
  };
  newsImages: any[] = [];

  get titleVi() {
    return this.form.get('titleVi');
  }

  get titleEn() {
    return this.form.get('titleEn');
  }

  get keyword() {
    return this.form.get('keyword');
  }

  get contentVi() {
    return this.form.get('contentVi');
  }

  get contentEn() {
    return this.form.get('contentEn');
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

  get imageName() {
    return this.form.get('imageName');
  }

  get categoryId() {
    return this.form.get('categoryId');
  }

  get featured() {
    return this.form.get('featured');
  }

  get isActived() {
    return this.form.get('isActived');
  }

  get isHomeView() {
    return this.form.get('isHomeView');
  }

  get fromDate() {
    return this.form.get('fromDate');
  }

  get toDate() {
    return this.form.get('toDate');
  }

  private destroyed$ = new Subject<void>();
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private calendarModule: CalendarModule,
    private stateService: StateService,
    private service: NewsService,
    private attachmentService: AttachmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initCols();
    this.getNews();
    this.getListNewsCategory();

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      titleVi: ['', [Validators.required, Validators.maxLength(250)]],
      titleEn: ['', [Validators.required, Validators.maxLength(250)]],
      descriptionsVi: ['', [Validators.required, Validators.maxLength(450)]],
      descriptionsEn: ['', [Validators.required, Validators.maxLength(450)]],
      contentVi: [''],
      contentEn: [''],
      keyword: [''],
      categoryId: ['', [Validators.required]],
      featured: [false],
      isActived: [false],
      isHomeView: [false],
      fromDate: [new Date()],
      toDate: [new Date()],
      location: [''],
      listImages: [null]
    });
  }

  getListNewsCategory() {
    this.service
      .getAllNewsCategory()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.newsCategories = data;
          }
        },
        (error) => {
          this.newsCategories = [];
        }
      );
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.editMode) {
      this.editNews();
    } else {
      this.addNews();
    }
  }

  getNews() {
    this.service
      .searchingNews(this.searchingModel)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.listNews = data;
          }
        },
        (error) => {
          this.listNews = [];
        }
      );
  }

  reloadData() {
    this.listNews = [];
    this.service.searchingNews(this.searchingModel).subscribe((data) => {
      this.listNews = data;
    });
  }

  initCols() {
    this.cols = [
      {
        field: 'title',
        header: 'Title',
      },
      {
        field: 'descriptions',
        header: 'Short descriptions',
      },
      {
        field: 'imageUrl',
        header: 'Cover Image',
      },
      {
        field: 'categoryName',
        header: 'News Category',
      },
      {
        field: 'isActived',
        header: 'Active',
      },
      {
        field: 'created',
        header: 'Created Date',
      },
    ];
  }

  openNew() {
    this.editMode = false;
    this.submitted = false;
    this.dialog = true;
    this.newsImages = [];
    this.initForm();
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  chooseFile(event){
    event.preventDefault();
    document.getElementById('file').click();
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileToUpload = {
        data: file,
        fileName: file.name,
      };
      const reader = new FileReader();
      reader.onload = (e)=>{
        var item = {
          fileUpload: fileToUpload,
          imageName: file.name,
          imageUrl: e.target.result,
        };
        this.newsImages.push(item);
      }; 
      reader.readAsDataURL(file);
      
      /*
      const fileToUpload = {
        data: file,
        fileName: file.name,
      };

      this.service.uploadImage(fileToUpload).subscribe(
        (result: any) => {
          if (result) {
            const { imageName, folderName, imageUrl } = result;
            this.form.patchValue({
              imageUrl: imageUrl,
            });

            this.form.patchValue({
              imageName: imageName,
            });
          }
        },
        (e) => {
          this.showMessage('error', 'Lỗi', 'Upload hình thất bại!');
          return '';
        }
      );*/
    }
  }
  removeImageItem(item) {
    this.newsImages = this.newsImages.filter((x) => x.imageUrl != item.imageUrl);
    const element: any = document.getElementById('file');
    element.value = '';
  }

  openEdit(item) {
    this.editMode = true;
    this.submitted = false;
    this.dialog = true;
    this.newsImages = [];

    item.fromDate = item.fromDate != undefined ? new Date(item.fromDate) : "";
    item.toDate = item.toDate != undefined ? new Date(item.toDate) : "";

    this.form.patchValue(item);

    if(item.listImages != undefined){
      item.listImages.forEach(element => {
        var imageData = {
          fileUpload: null,
          imageName: element.imageName,
          imageUrl: element.imageUrl,
          imagePath: element.imagePath
        };
        this.newsImages.push(imageData);
      });
    }
  }

  async editNews() {
    const data = Object.assign({}, this.form.value);
    data.fromDate = moment(data.fromDate).format("yyyy-MM-DD");
    data.toDate = moment(data.toDate).format("yyyy-MM-DD");
    data.listImages = await this.getUploadImagesInfo();
    
    this.service.editNews(data.id, data).subscribe(
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
        this.showMessage('error', 'Error', 'An unexpected server error occurred!')
      }
    );
  }

  async addNews() {
    const data = Object.assign({}, this.form.value);
    data.fromDate = moment(data.fromDate).format("yyyy-MM-DD");
    data.toDate = moment(data.toDate).format("yyyy-MM-DD");
    
    data.listImages = await this.getUploadImagesInfo();
    this.service.addNews(data).subscribe(
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
        this.showMessage('error', 'Error', 'An unexpected server error occurred!')
      }
    );
  }

  async getUploadImagesInfo(){
    const listImages: NewsImageDto[] = [];
    for (let index = 0; index < this.newsImages.length; index++) {
      const element = this.newsImages[index];
      if(element.fileUpload == undefined){
        listImages.push({
          imageName: element.imageName,
          imagePath: element.imagePath,
          imageUrl: element.imageUrl
        });
        continue;
      }
      const result = await this.attachmentService.uploadFile(AttachmentType.Photo,"News", element.fileUpload).toPromise();
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

  deleteNews(item) {
    this.confirmationService.confirm({
      message: 'Confirm delete ' + item.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteNews(item.id).subscribe(
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
            this.showMessage('error', 'Error', 'An unexpected server error occurred!')
          }
        );
      },
    });
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

  handleChangeActive(value, item: NewsDto, key: string) {
    if (key == 'featured') {
      item.featured = value.checked;
    }
    if (key == 'isHomeView') {
      item.isHomeView = value.checked;
    }
    if (key == 'isActived') {
      item.isActived = value.checked;
    }

    this.service.updateActive(item.id, value.checked).subscribe(
      (result) => {
        if (result && result.succeeded) {
          this.showMessage('success', 'Successful', 'Cập nhật thành công');
          this.form.patchValue({
            ...item,
          });
          this.reloadData();
          this.hideDialog();
        } else {
          if (result.errors.length > 0) {
            this.showMessage('error', 'Thất bại', result.errors[0]);
          } else {
            this.showMessage('error', 'Thất bại', 'Cập nhât thất bại');
          }
        }
      },
      (err) => {
        var message = err ? err : 'Có lỗi trong quá trình cập nhật';
        this.showMessage('error', 'Thất bại', message);
      }
    );
   
  }

  // deleteSelectedItems() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected items?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.
  //       this.selectedProducts = null;
  //       this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
  //     },
  //   });
  // }

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // ============
  // Filter
  onChangeFeaturedFilter(value: any) {
    this.searchingModel.featured = value ? value : undefined;
    this.reloadData();
  }

  onChangeTitleFitler(value: any) {
    this.searchingModel.title = value ? value : '';
    this.reloadData();
  }
}
