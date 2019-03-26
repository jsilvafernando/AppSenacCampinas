import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidateStudentsEditPage } from './validate-students-edit';

@NgModule({
  declarations: [
    ValidateStudentsEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidateStudentsEditPage),
  ],
})
export class ValidateStudentsEditPageModule {}
