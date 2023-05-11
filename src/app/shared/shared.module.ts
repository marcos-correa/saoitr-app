import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SetApiComponent } from './set-api/set-api.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [SetApiComponent, HeaderComponent, SideMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [SetApiComponent, HeaderComponent, SideMenuComponent],
})
export class SharedModule {}
