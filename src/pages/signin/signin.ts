import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AccountProvider } from './../../providers/auth/auth';
import { CourseProvider } from '../../providers/course/course';
import { ZoneProvider } from '../../providers/zone/zone';
import { OneSignal } from '@ionic-native/onesignal';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  private PATH = 'users/';
  form: FormGroup;
  emailsenac: string;
  zones: Observable<any[]>;
  courses: Observable<any[]>;
  items: Observable<any[]>;
  course: string;
  zone: string;
  public player_id: any;


  constructor(public auth: AngularFireAuth,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authProvider: AccountProvider,
    private db: AngularFireDatabase,
    private courseProvider: CourseProvider,
    private zonesProvider: ZoneProvider,
    private oneSignal: OneSignal,
    private toast: ToastController) {

      // this.oneSignal.getIds().then(ids => {
      //   this.player_id = JSON.stringify(ids.userId);
      //   console.log(this.player_id);
      // })

    this.createForm();
    this.zones = this.zonesProvider.getAll();
    this.items = this.courseProvider.getAll(null);

  }

  getCourses() {
    this.items = this.courseProvider.getAll(this.zone);
  }

  private createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authProvider.login(this.form.value)
        .then((user: any) => {
          this.emailsenac = user.email.split('@');
          if (user.emailVerified) {
            if (this.emailsenac[1] == 'sp.senac.br'){
                // OneSignal ============================
                // this.oneSignal.deleteTag("zone");
                // this.oneSignal.deleteTag("course");
                // this.oneSignal.deleteTag("classe");
                // this.oneSignal.deleteTag("senac");
                // this.oneSignal.sendTag("senac",this.emailsenac[1]);
                // this.oneSignal.sendTag("zone",user.zoneuser);
                // this.oneSignal.sendTag("course",user.courseuser);
                // // this.oneSignal.sendTag("classe", user.classeuser);
                // this.db.object(this.PATH + user.userkey).update({ idOneSignal: this.player_id });
                // ======================================
                this.navCtrl.setRoot('TabsPage');
            } else {
              if (user.verified == true) {
                // OneSignal ============================
                this.oneSignal.deleteTag("zone");
                this.oneSignal.deleteTag("course");
                this.oneSignal.deleteTag("classe");
                this.oneSignal.deleteTag("senac");
                this.oneSignal.sendTag("zone",user.zoneuser);
                this.oneSignal.sendTag("course",user.courseuser);
                this.oneSignal.sendTag("classe", user.classeuser);
                this.db.object(this.PATH + user.userkey).update({ idOneSignal: this.player_id });
                // ======================================
                this.navCtrl.setRoot('TabsPage');
              } else {
                this.toast.create({ message: 'Seu e-mail já foi verificado, Mas falta validação do Docente de Projetos', duration: 6000 }).present();
              }
            }
          } else {
            this.toast.create({ message: 'Seu e-mail ainda não foi verificado. Por favor acesse seu e-mail e clique no link para verificar conta.', duration: 6000 }).present();
          }
        })
        .catch(message => {
          this.toast.create({ message: message, duration: 3000 }).present();
          console.error(message);
        });
    }
  }

  public forgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
  }

  public signup() {
    this.navCtrl.push('SignupPage');
  }

  public openPrivacyPolicy(){
    this.navCtrl.push('PrivacyPolicyPage');
  }

}
