import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectViewPage } from './project-view';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProjectViewPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ProjectViewPage),
  ],
})
export class ProjectViewPageModule {}
