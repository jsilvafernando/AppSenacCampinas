import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentsProjectListPage } from './students-project-list';

@NgModule({
  declarations: [
    StudentsProjectListPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentsProjectListPage),
  ],
})
export class StudentsProjectListPageModule {}
