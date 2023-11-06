import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AttachmentService } from 'app/services/attachment.service';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
})
export class FormTableComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  @Input() formName: string;
  @Input() maxRowInsert: number;
  
  @Output() newClickedEvent = new EventEmitter<any>();
  @Output() editClickedEvent = new EventEmitter<any>();
  @Output() deleteClickedEvent = new EventEmitter<any>();

  formDetail: FormGroup;
  arrField = [];
  listData = [];
  listDataFull = [];

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private attachmentService: AttachmentService,
  ) {}

  ngOnInit() {
    
  }

  openNew(){
    if(this.maxRowInsert != undefined && this.maxRowInsert > 0){
      if(this.listDataFull.length >= this.maxRowInsert){
        return;
      }
    }

    this.newClickedEvent.emit();
  }

  openEdit(item){
    this.editClickedEvent.emit(item);
  }

  delete(item){
    this.deleteClickedEvent.emit(item);
  }

  setArrField(arrFieldParam){
    this.arrField = arrFieldParam;
  }

  setListData(listDataParam: Array<any>){
    this.listData = listDataParam;
    this.listDataFull = listDataParam;
  }

  onFilterChange(value, id){
    if(value != undefined){
      this.listData = this.listDataFull.filter((element)=>{
        return element.data[id] == value.value;
      });
    }
    else{
      this.listData = this.listDataFull;
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
