import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';
import { FileSizeFormatPipe } from './file-size-format.pipe';
 
const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountPage,FileSizeFormatPipe]
})
export class AccountPageModule {}
