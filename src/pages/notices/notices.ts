import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticesProvider } from './../../providers/notices/notices';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AccountProvider } from './../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html',
})
export class NoticesPage {
  notices: Observable<any[]>;
  zoneKey: string;
  courseKey: string;
  classeKey: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AngularFireAuth,
    private AccountProvider: AccountProvider,
    private noticesProvider: NoticesProvider) {

    this.notices = this.noticesProvider.getAll();
    const userState = this.auth.authState.subscribe( user => {
      if (user){
         // os demais dados do database
         // subscribe => se inscrever no método
         const subscribe = this.AccountProvider.gettUserData(user.uid).subscribe(userData =>{
           subscribe.unsubscribe(); // desincrever para não ficar recebendo atualizações do usuário
                                     // no subscribe acima foi recebido os dados do usuário em userData
          //  this.zoneKey = userData.zonekey;
          //  this.courseKey = userData.coursekey;
          //  this.classeKey = userData.classekey;
         });
         userState.unsubscribe();
         }
     })

  }

  noticesView(_event, item) {
		this.navCtrl.push('NoticesDetailPage', {
		  item: item
		});
  }


}
