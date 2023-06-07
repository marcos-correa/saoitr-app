import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule as SharedLocalModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { UserFormComponent } from '../shared/user-form/user-form.component';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [CreateUserComponent, ProfileComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    SharedModule,
    SharedLocalModule,
    ToastModule,
    ReactiveFormsModule,
    // UserFormComponent,

    InputTextModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    DialogModule,
  ],
  exports: [CreateUserComponent, ProfileComponent],
})
export class AccountModule {}
