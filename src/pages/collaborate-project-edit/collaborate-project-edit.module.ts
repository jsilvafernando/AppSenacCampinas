import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollaborateProjectEditPage } from './collaborate-project-edit';

@NgModule({
  declarations: [
    CollaborateProjectEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CollaborateProjectEditPage),
  ],
})
export class CollaborateProjectEditPageModule {}
