import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AccountProvider } from './../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyprojectProvider } from '../../providers/myproject/myproject';

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage {
  user: any = {}; // preciso instanciar pra não dar erro...
  users: any = {};
  projectsHelp: Observable<any[]>;
  projectsCooperate: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public authProvider: AccountProvider,
              private myprojectProvider: MyprojectProvider,
              public auth: AngularFireAuth) {
      this.user = this.authProvider.getUserData();
      const subscribe = this.authProvider.gettUserData(this.user.primarykey).subscribe(usersData => {
        subscribe.unsubscribe();
        this.users = usersData;
      });
      this.projectsHelp = this.myprojectProvider.getUserProjectHelp(this.user.primarykey);
      this.projectsCooperate = this.myprojectProvider.getUserProjectCollaborate(this.user.primarykey);
  }

  // openMyAddresses() {
  //   this.navCtrl.push('AddressListPage');
  // }

  openMyProfile() {
    this.navCtrl.push('ProfileListPage');
  }

  // openNotices(){
  //   this.navCtrl.push('NoticesPage');
  // }

  // signOut() {
  //   this.authProvider.signOut();
  //   this.navCtrl.parent.parent.setRoot('SigninPage'); //redirecionar para página de login
  //   // se não for usando tabs use o modelo abaixo
  //   // this.navCtrl.setRoot('SigninPage');
  // }

}
