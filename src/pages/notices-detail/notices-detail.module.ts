import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticesDetailPage } from './notices-detail';

@NgModule({
  declarations: [
    NoticesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticesDetailPage),
  ],
})
export class NoticesDetailPageModule {}
