import { MyprojectProvider } from '../../providers/myproject/myproject';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-myproject-list',
  templateUrl: 'myproject-list.html',
})
export class MyprojectListPage {
  items: Observable<any[]>;
  // selectMyProjectMode = false;
  projectsHelp: Observable<any[]>;
  project: any = {};
  projectsCooperate: Observable<any[]>;

  constructor(
    public navCtrl: NavController, public navParam: NavParams, public auth: AngularFireAuth,
    private myprojectProvider: MyprojectProvider, private toast: ToastController,
    public viewCtrl: ViewController) {

    if (!this.auth.auth.currentUser) return; // se o usuário nao estiver autenticado retorna e não continua

    this.items = this.myprojectProvider.getAll();
    const subscribe = this.myprojectProvider.getAll().subscribe((DataProject:any) => {
      subscribe.unsubscribe();
      this.project = DataProject;
      this.projectsHelp = this.myprojectProvider.getProjectHelp(this.project[length].keyproject);
      this.projectsCooperate = this.myprojectProvider.getProjectCollaborate(this.project[length].keyproject);
    });


  }


  newItemMyProject() {
    this.navCtrl.push('MyprojectEditPage');
  }


  editItemMyProject(item: any) {
    this.navCtrl.push('MyprojectEditPage', { item: item });
  }

  removeItemMyProject(keyproject: string, key:string) {
    this.myprojectProvider.remove(keyproject,key);
    this.toast.create({ message: 'Projeto removido com sucesso.', duration: 6000 }).present();
  }



}
