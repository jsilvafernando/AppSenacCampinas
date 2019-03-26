import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AccountProvider } from './../../providers/auth/auth';
import { ScheduleProvider } from './../../providers/schedule/schedule';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  schedules: Observable<any[]>;
  UzoneKey: string;
  UcourseKey: string;
  UclasseKey: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AngularFireAuth,
    private AccountProvider: AccountProvider,
    private scheduleProvider: ScheduleProvider) {

    this.schedules = this.scheduleProvider.getAll();
    const userState = this.auth.authState.subscribe( user => {
      if (user){
         // os demais dados do database
         // subscribe => se inscrever no método
         const subscribe = this.AccountProvider.gettUserData(user.uid).subscribe(userData =>{
           subscribe.unsubscribe(); // desincrever para não ficar recebendo atualizações do usuário
                                     // no subscribe acima foi recebido os dados do usuário em userData
          this.UzoneKey = userData.zonekey;
          console.log(this.UzoneKey);
          this.UcourseKey = userData.coursekey;
          console.log(this.UcourseKey);
          this.UclasseKey = userData.classekey;
                                   });
         userState.unsubscribe();
         }
     })

  }

  schedulesView(_event, item) {
		this.navCtrl.push('ScheduleDetailPage', {
		  item: item
		});
  }


}
