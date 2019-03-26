import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentsProjectAddPage } from './students-project-add';

@NgModule({
  declarations: [
    StudentsProjectAddPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentsProjectAddPage),
  ],
})
export class StudentsProjectAddPageModule {}
