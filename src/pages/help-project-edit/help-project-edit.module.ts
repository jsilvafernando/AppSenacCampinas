import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpProjectEditPage } from './help-project-edit';

@NgModule({
  declarations: [
    HelpProjectEditPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpProjectEditPage),
  ],
})
export class HelpProjectEditPageModule {}
