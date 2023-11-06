import { ContactTypesEnum } from './../../../../api-clients/general-client';
import { ContactCustomerService } from '../../../../services/contact-customer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactCustomerDto } from 'app/api-clients/general-client';

@Component({
  selector: 'app-contact-customer',
  templateUrl: './contact-customer.component.html',
  styleUrls: ['./contact-customer.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ContactCustomerComponent implements OnInit, OnDestroy {
  cols: any[];
  selectedItems: any;
  contactCustomers: ContactCustomerDto[];
  form: FormGroup;
  contactTypeEnum = ContactTypesEnum;

  private destroyed$ = new Subject<void>();
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: ContactCustomerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initCols();
    this.getContactCustomers();
  }

  getContactCustomers() {
    this.service
      .getAllContactCustomer()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.contactCustomers = data;
          }
        },
        (error) => {
          this.contactCustomers = [];
        }
      );
  }

  reloadData() {
    this.service.getAllContactCustomer().subscribe((data) => {
      this.contactCustomers = data;
    });
  }

  initCols() {
    this.cols = [
      { field: 'contactType', header: 'Loại thông tin' },
      //{ field: 'customerName', header: 'Họ và tên' },
      //{ field: 'customerPhone', header: 'Số điện thoại' },
      { field: 'customerEmail', header: 'Email' },
      //{ field: 'content', header: 'Nội dung' },
      { field: 'receiveStatus', header: 'Trạng thái' },
      { field: 'created', header: 'Ngày tạo' },
    ];
  }

  changeStatus(item) {
    this.service.editContactCustomer(item.id, item).subscribe(
      (result) => {
        if (result && result.succeeded) {
          this.showMessage('success', 'Thành công', 'Cập nhật thành công');
          // this.reloadData();
        } else {
          if (result.errors.length > 0) {
            this.showMessage('error', 'Thất bại', result.errors[0]);
          } else {
            this.showMessage('error', 'Thất bại', 'Cập nhật thất bại');
          }
        }
      },
      (_) => this.showMessage('error', 'Thất bại', 'Có lỗi trong quá trình cập nhật!')
    );
  }

  deleteContactCustomer(item) {
    this.confirmationService.confirm({
      message: 'Xác nhận xóa ' + item.categoryName + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteContactCustomer(item.id).subscribe(
          (result) => {
            if (result && result.succeeded) {
              this.showMessage('success', 'Thành công', 'Đã xóa thành công');
              this.reloadData();
            } else {
              if (result.errors.length > 0) {
                this.showMessage('error', 'Thất bại', result.errors[0]);
              } else {
                this.showMessage('error', 'Thất bại', 'Xóa thất bại');
              }
            }
          },
          (_) => this.showMessage('error', 'Thất bại', 'Có lỗi trong quá trình xóa!')
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

  handleChangeActive(value, item: ContactCustomerDto) {
    item.receiveStatus = value.checked;

    this.changeStatus(item);
  }
}
