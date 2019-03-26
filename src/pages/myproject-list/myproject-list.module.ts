import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyprojectListPage } from './myproject-list';

@NgModule({
  declarations: [
    MyprojectListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyprojectListPage),
  ],
})
export class MyprojectListPageModule {}
