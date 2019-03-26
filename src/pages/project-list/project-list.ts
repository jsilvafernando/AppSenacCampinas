import { MyprojectProvider } from './../../providers/myproject/myproject';
import { CourseProvider } from './../../providers/course/course';
import { ZoneProvider } from './../../providers/zone/zone';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {
  items: Observable<any[]>;
  zones: Observable<any[]>;
  courses: Observable<any[]>;
  projects: Observable<any[]>;
  userprojects: Observable<any[]>;
  course: string;
  zone: string;


  constructor(public navCtrl: NavController, public auth: AngularFireAuth,
    private courseProvider: CourseProvider,
    private zonesProvider: ZoneProvider,
    private myprojectProvider: MyprojectProvider
    ) {

    this.zones = this.zonesProvider.getAll();
    this.items = this.courseProvider.getAll(null);
    this.projects = this.myprojectProvider.getAllProjects(null);
    console.log(this.projects);
    //  this.userprojects = this.myprojectProvider.getUserProject(this.projects.key);
  }

  getCourses() {
    this.items = this.courseProvider.getAll(this.zone);
  }

  getProjects(){
    this.projects = this.myprojectProvider.getAllProjects(this.course);
  }

  listProject(project: any) {
    this.navCtrl.push('ProjectViewPage', { projects: project });
  }


}
