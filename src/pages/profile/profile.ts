import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from './../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  rootPage = 'UserinfoPage';
  user: any = {};
  constructor(public navCtrl: NavController, //private toast: ToastController
    public navParams: NavParams, public authProvider: AccountProvider,
    ) {
    this.user = this.authProvider.getUserData();
  }

  openSignin(){
    this.navCtrl.push('SigninPage');
  }
  openAbout(){
    this.navCtrl.push('AboutPage');
  }
  openPerfil(){
    this.navCtrl.push('UserinfoPage');
  }
  openHome(){
    this.navCtrl.push('ProductListPage');
  }
  openValidadeStudents(){
    this.navCtrl.push('ValidateStudentsListPage')
  }

  openNotices(){
    this.navCtrl.push('NoticesPage');
  }

  openSchedule(){
    this.navCtrl.push('SchedulePage');
  }


  signOut() {
    this.authProvider.signOut();
    this.navCtrl.parent.parent.setRoot('ProfilePage'); //redirecionar para página de login
    // this.navCtrl.parent.parent.setRoot('SigninPage'); //redirecionar para página de login
    // se não for usando tabs use o modelo abaixo
    // this.navCtrl.setRoot('SigninPage');
  }

}
