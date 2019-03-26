import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AccountProvider } from './../../../providers/auth/auth';
import { ZoneProvider } from './../../../providers/zone/zone';
import { CourseProvider } from './../../../providers/course/course';
import { MyprojectProvider } from './../../../providers/myproject/myproject';

@IonicPage()
@Component({
  selector: 'page-students-project-list',
  templateUrl: 'students-project-list.html',
})
export class StudentsProjectListPage {
  userName: string;
  userMail: any;
  userKey:any;

  zones: Observable<any[]>;
  courses: Observable<any[]>;
  users: Observable<any[]>;
  usersprojects: Observable<any[]>;
  zone: string;
  course:string;
  project: any;
  projectname: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AngularFireAuth,
              private toast: ToastController,
              private authProvider: AccountProvider,
              private zonesProvider: ZoneProvider,
              private courseProvider: CourseProvider,
              private myprojectProvider: MyprojectProvider
              ) {
      this.project = this.navParams.data.myproject || {};
      console.log(this.project)
      this.zones = this.zonesProvider.getAll();
      this.courses = this.courseProvider.getAll(null);
      this.usersprojects = this.myprojectProvider.getUserProject(this.project.keyproject);
      console.log(this.usersprojects);
      this.projectname = this.project.name;

  }

  getCourse() {
    this.courses = this.courseProvider.getAll(this.zone);
  }

  getUsers(){
    this.users = this.authProvider.getAll(this.course);
  }

  RemoveUserProject(user:any) {
    this.myprojectProvider.RemoveUserProject(user.key, this.project, user.userkey);
    this.toast.create({ message: 'Usuário removido do Projeto com sucesso.', duration: 6000 }).present();
  }

  addUserProject(user: any) {
    console.log(user);
    console.log(this.project);
    const usuario = {
      userkey: user.key,
      username: user.name,
      useremail: user.email,
    }
    const projeto = {
      name: this.project.name,
      description: this.project.description,
      monthstartyear: this.project.monthstartyear,
      monthfinishyear: this.project.monthfinishyear,
      classekey: this.project.classekey,
      classe: this.project.classe,
      zonekey: this.project.zonekey,
      zone: this.project.zone,
      coursekey: this.project.coursekey,
      course: this.project.course,
      keyproject:this.project.keyproject,

    }
    this.myprojectProvider.AddUserProject(this.project.keyproject, usuario, projeto, user.key)
    .then(() => {
      this.toast.create({ message: 'Usuário adicionado ao Projeto com sucesso.', duration: 6000 }).present();
      // this.navCtrl.pop();
    }).catch(() => {
      this.toast.create({ message: 'Ocorreu algum erro ao salvar o usuário no Projeto, por favor tente novamente.', duration: 6000 }).present();
    });

  }


}
