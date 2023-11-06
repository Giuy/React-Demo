import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService, States } from 'app/services/state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactEmailService } from 'app/services/contact-email.service';

@Component({
  selector: 'app-contact-email',
  templateUrl: './contact-email.component.html',
  styleUrls: ['./contact-email.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ContactEmailComponent implements OnInit, OnDestroy {
  cols: any[];
  dialog = false;
  submitted = false;
  selectedItems: any[];
  contactEmails: any[];
  form: FormGroup;
  editMode = false;

  get senderEmailAddress() {
    return this.form.get('senderEmailAddress');
  }

  get senderEmailPassword() {
    return this.form.get('senderEmailPassword');
  }

  get recieveCompany() {
    return this.form.get('recieveCompany');
  }

  get recieveDepartment() {
    return this.form.get('recieveDepartment');
  }

  get regardsText() {
    return this.form.get('regardsText');
  }

  get emailNoted() {
    return this.form.get('emailNoted');
  }

  get descriptions() {
    return this.form.get('descriptions');
  }

  get isActive() {
    return this.form.get('isActive');
  }

  private destroyed$ = new Subject<void>();
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private stateService: StateService,
    private service: ContactEmailService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initCols();
    // this.getAllContactEmail();

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      senderEmailAddress: ['', [Validators.required]],
      senderEmailPassword: ['', [Validators.required]],
      recieveCompany: ['', [Validators.required]],
      recieveDepartment: [''],
      regardsText: [''],
      emailNoted: [''],
      descriptions: [''],
      isActive: [false],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // if (this.editMode) {
    //   this.editContactEmail();
    // } else {
    //   this.addContactEmail();
    // }
  }

  // getAllContactEmail() {
  //   this.service
  //     .getAllContactEmail()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe(
  //       (data) => {
  //         if (data) {
  //           this.contactEmails = data;
  //         }
  //       },
  //       (error) => {
  //         this.contactEmails = [];
  //       }
  //     );
  // }

  reloadData() {
    // this.contactEmails = [];
    // this.service.getAllContactEmail().subscribe((data) => {
    //   this.contactEmails = data;
    // });
  }

  initCols() {
    this.cols = [
      { field: 'senderEmailAddress', header: 'Email gửi' },
      { field: 'recieverEmailAddress', header: 'Email nhận' },
      { field: 'recieveCompany', header: 'Công ty nhận' },
      { field: 'isActive', header: 'Trạng thái kích hoạt' },
      { field: 'created', header: 'Ngày tạo' },
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

  



  // deleteSelectedItems() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected items?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.attachmentTypes = this.products.filter(val => !this.selectedProducts.includes(val));
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

}
