import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TwoDigitDecimaDirective } from 'app/core/input-type/twoDigitDecimaDirective';
import { PositiveNumberDirective } from 'app/core/input-type/positiveNumberDirective';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipsModule } from 'primeng/chips';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [SelectCompanyComponent, CkeditorComponent, TwoDigitDecimaDirective, PositiveNumberDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelMenuModule,
    MenuModule,
    DataViewModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    CKEditorModule,
    InputSwitchModule,
    ChipsModule,
    PanelModule,
    TabViewModule,
    ChipModule,
    TooltipModule,

    /** Angular Material Form */
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PanelMenuModule,
    MenuModule,
    DataViewModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    SelectCompanyComponent,
    CkeditorComponent,
    InputSwitchModule,
    ChipsModule,
    PanelModule,
    TabViewModule,
    ChipModule,
    TooltipModule,

    /** Angular Material Form */
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,

    TwoDigitDecimaDirective,
    PositiveNumberDirective,
  ],
  providers: [],
})
export class SharedModule {}
