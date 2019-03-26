import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ToastController, ViewController  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile-list',
  templateUrl: 'profile-list.html',
})
export class ProfileListPage {
  user: any;
  userprofile: any = {};

  constructor(
    public navCtrl: NavController, public navParam: NavParams,
    private profileProvider: ProfileProvider, private toast: ToastController,
    public viewCtrl: ViewController) {

    //this.items = this.profileProvider.getAll();
    const subscribe = this.profileProvider.getAll().subscribe(usersData => {
      subscribe.unsubscribe();
      this.user = usersData;
      this.createView();
    });
  }

  createView(){
    this.userprofile = {
      experiencia: this.user.experiencia,
      formacao: this.user.formacao,
      interesses: this.user.interesses,
    }
  }


  newItemProfile() {
    this.navCtrl.push('ProfileEditPage');
  }

  editItemProfile(item: any) {
    this.navCtrl.push('ProfileEditPage', { item: item });
  }

  removeItemProfile() {
    this.profileProvider.remove();
    this.toast.create({ message: 'Perfil removido com sucesso.', duration: 3000 }).present();
    this.navCtrl.pop();
  }

}
