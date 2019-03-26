import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'ProfilePage';
  // rootPage:any = 'TabsPage';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AngularFireAuth,
    public alertCtrl: AlertController,
    private oneSignal: OneSignal) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.configurePushNotification();

      this.auth.authState.subscribe(user => {
        if (!user) {
          // this.rootPage = 'SigninPage';
          this.rootPage = 'ProfilePage';
        }
      });
    });

  }

  configurePushNotification(){

    this.oneSignal.startInit('e7506193-e293-4842-bcac-d0dcdb253956','940230609320');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      // tratamento da push notification
      this.oneSignal.handleNotificationReceived()
        .subscribe((response) => {
          console.log('received', response);
      });

      // this.oneSignal.handleNotificationOpened()
      //   .subscribe((response) => {
      //     console.log('opened', response)
      // });

      this.oneSignal.handleNotificationOpened().subscribe(jsonData => {
          // do something when a notification is opened
          // Caso pare de funcionar provavelmente mudou objeto jsonData, nesse caso é interessante habilitar
          // a linha abaixo para ver como objeto está sendo recebido
          //this.showAlert("modal", JSON.stringify(jsonData));
          this.showAlert(jsonData.notification.payload.title, jsonData.notification.payload.body);
      });

      this.oneSignal.endInit();

  }

  showAlert(t:any, b:any) {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: b,
      buttons: ['OK']
    });
    alert.present();
  }

  // ENVIO DE MENSAGENS ONESIGNAL POR PLAYERID
  // this.oneSignal.getIds().then(ids => {
  //   var body = {
  //   app_id: seu chave no onesignal,
  //   include_player_ids: [Player ID do destinatario],
  //   contents: {
  //   en: "sua descrição"
  //   },
  //   headings: {
  //   en: "Seu titulo"
  //   }
  //   };
  //   this.http.post('https://onesignal.com/api/v1/notifications', body).subscribe(data => {
  //   console.log(data);
  //   } , error => {
  //   console.log(error);
  //   });
  //   });

}
