import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidateStudentsListPage } from './validate-students-list';

@NgModule({
  declarations: [
    ValidateStudentsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidateStudentsListPage),
  ],
})
export class ValidateStudentsListPageModule {}
