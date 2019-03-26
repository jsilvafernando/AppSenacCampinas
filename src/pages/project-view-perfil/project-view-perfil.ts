import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from './../../providers/auth/auth';
import { ProfileProvider } from './../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-project-view-perfil',
  templateUrl: 'project-view-perfil.html',
})
export class ProjectViewPerfilPage {
  users:any;
  user: any;
  profile: any;
  userprofile: any = {};

  // user: Observable<any[]>;
  // profile: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private usersProvider: AccountProvider,
              private profileProvider: ProfileProvider) {
                this.users = this.navParams.data.users || {};
                                                            //objeto assíncrono, estou me inscrevendo(subscribe) e recebendo no categoriaData o que vem do get no return lin 22 do provider (categoria.ts)
                                                            //this.navParams.data.categoriaKey = categoriakey do list-categoria.ts (editItemCategoria) lin 24
                const subscribep = this.profileProvider.gettUserComplement(this.navParams.data.users.userkey).subscribe(profileData => {
                    subscribep.unsubscribe();
                    this.profile = profileData;
                    const subscribeu = this.usersProvider.gettUserData(this.navParams.data.users.userkey).subscribe(usersData => {
                      subscribeu.unsubscribe();
                      this.user = usersData;
                      this.CreateView();
                    });
                });

                // this.user = this.usersProvider.gettUserData(this.navParams.data.users.userkey);
                // this.profile = this.profileProvider.gettUserComplement(this.navParams.data.users.userkey);

  }

  private CreateView(){
    this.userprofile = {
      name: this.user.name,
      zoneuser: this.user.zoneuser,
      courseuser: this.user.courseuser,
      classeuser: this.user.classeuser,
      experiencia: this.profile.experiencia,
      formacao: this.profile.formacao,
      interesses: this.profile.interesses,
    }
  }

  ionViewDidLoad() {}

}
