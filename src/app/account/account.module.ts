import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [CreateUserComponent, ProfileComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    SharedModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  exports: [CreateUserComponent, ProfileComponent],
})
export class AccountModule {}
