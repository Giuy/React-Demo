import { CreateNewsCategoryDto } from './../../../../api-clients/general-client';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService, States } from 'app/services/state.service';
import { NewsService } from 'app/services/news.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsCategoryDto } from 'app/api-clients/general-client';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class NewsCategoryComponent implements OnInit, OnDestroy {
  cols: any[];
  dialog = false;
  submitted = false;
  selectedItems: NewsCategoryDto[];
  newsCategories: NewsCategoryDto[];
  form: FormGroup;
  editMode = false;

  get categoryNameVi() {
    return this.form.get('categoryNameVi');
  }

  get categoryNameEn() {
    return this.form.get('categoryNameEn');
  }

  get friendlyUrl() {
    return this.form.get('friendlyUrl');
  }

  get keyword() {
    return this.form.get('keyword');
  }

  get isActived() {
    return this.form.get('isActived');
  }

  private destroyed$ = new Subject<void>();
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private stateService: StateService,
    private service: NewsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initCols();
    this.getNewsCategories();

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      categoryNameVi: ['', [Validators.required, Validators.maxLength(250)]],
      categoryNameEn: ['', [Validators.required, Validators.maxLength(250)]],
      keyword: [''],
      isActived: [false],
      id: ['00000000-0000-0000-0000-000000000000'],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.editMode) {
      this.editNewsCategory();
    } else {
      this.addNewsCategory();
    }
  }

  getNewsCategories() {
    this.service
      .getAllNewsCategoryForAdmin()
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

  reloadData() {
    this.newsCategories = [];
    this.service.getAllNewsCategoryForAdmin().subscribe((data) => {
      this.newsCategories = data;
    });
  }

  initCols() {
    this.cols = [
      { field: 'categoryName', header: 'News category name' },
      { field: 'created', header: 'Created date' },
      { field: 'isActived', header: 'Active' },
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

  editNewsCategory() {
    this.service.editNewsCategory(this.form.value.id, this.form.value).subscribe(
      (result) => {
        if (result && result.succeeded) {
          this.showMessage('success', 'Success', 'Update successfully!');
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

  addNewsCategory() {
    const data = Object.assign({}, this.form.value);
    this.service.addNewsCategory(data).subscribe(
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

  deleteNewsCategory(item) {
    this.confirmationService.confirm({
      message: 'Confirm delete ' + item.categoryName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteNewsCategory(item.id).subscribe(
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

  showMessage(type: string, summary: string, detail: string = '', timeLife: number = 3000) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: timeLife });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleChangeActive(value, item: NewsCategoryDto, key: string) {
    if (key == 'isActived') {
      item.isActived = value.checked;
    }
    this.form.patchValue({
      ...item,
    });
    this.editNewsCategory();
  }
}
