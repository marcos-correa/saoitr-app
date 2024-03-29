import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SetApiComponent } from './set-api/set-api.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OccurencesComponent } from './occurences/occurences.component';
import { ToolbarModule } from 'primeng/toolbar';

import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OccurrenceFormComponent } from './occurrence-form/occurrence-form.component';
import { OccurrencesMapComponent } from './occurrences-map/occurrences-map.component';
import { GMapModule } from 'primeng/gmap';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { UserFormComponent } from './user-form/user-form.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    SetApiComponent,
    HeaderComponent,
    SideMenuComponent,
    DialogComponent,
    OccurencesComponent,
    OccurrenceFormComponent,
    OccurrencesMapComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    DialogModule,

    // PrimeNG
    ToastModule,
    ToolbarModule,
    GMapModule,
    RippleModule,
    PasswordModule,

    TableModule,
    TabMenuModule,
    TabViewModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
  ],
  exports: [
    SetApiComponent,
    HeaderComponent,
    SideMenuComponent,
    OccurencesComponent,
    OccurrencesMapComponent,
    UserFormComponent,

    // PrimeNG
    ToastModule,
    ToolbarModule,
    GMapModule,

    TableModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class SharedModule {}
