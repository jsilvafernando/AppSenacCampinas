import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AccountProvider } from './../../../providers/auth/auth';
import { ZoneProvider } from './../../../providers/zone/zone';
import { CourseProvider } from './../../../providers/course/course';


@IonicPage()
@Component({
  selector: 'page-validate-students-list',
  templateUrl: 'validate-students-list.html',
})
export class ValidateStudentsListPage {
  userName: string;
  userMail: any;
  userKey:any;
  zonesTotal=0;
  courseTotal=0;
  zones: Observable<any[]>;
  courses: Observable<any[]>;
  users: Observable<any[]>;
  zone: string;
  course:string;



  constructor(public navCtrl: NavController,
    public navParams: NavParams, public auth: AngularFireAuth,
    private toast: ToastController,
    private loadingCtrl: LoadingController,
    private authProvider: AccountProvider,
    private zonesProvider: ZoneProvider,
    private courseProvider: CourseProvider) {


      this.zones = this.zonesProvider.getAll();
      // this.totalZone = this.zones;
      // console.log(this.totalZone);
      this.courses = this.courseProvider.getAll(null);

    }

    public loading = this.loadingCtrl.create({
      content: 'Carregando ...'
    });

    getCourse() {
      this.users = this.authProvider.getAllZones(this.zone);

      const subscribe = this.authProvider.getTotalZones(this.zone).subscribe((total: number) => {
        subscribe.unsubscribe();
        this.zonesTotal = total;
      });

      this.loading.present();
      this.courses = this.courseProvider.getAll(this.zone);
      this.loading.dismiss();
    }

    getUsers(){
      this.users = this.authProvider.getAll(this.course);
      if(this.course != ''){
        const subscribe = this.authProvider.getTotalCourses(this.course).subscribe((total: number) => {
          subscribe.unsubscribe();
          this.courseTotal = total;
        });
      }

    }

    editValidateUser(user: any) {
      this.navCtrl.push('ValidateStudentsEditPage', { users: user });
    }

  ionViewCanEnter(): Promise<any> { // retorna um boolean ou uma promise
    return new Promise((resolve, reject) =>{
      const userState = this.auth.authState.subscribe( user => {
        if (user){
          // console.log('Tô logado');
          this.userName = user.displayName; // buscando o nome do usuário do profile
          this.userMail = user.email.split('@');
          if (this.userMail[1] == 'sp.senac.br'){
            resolve();
            // console.log('Sou @senac');
            return false;
          } else {
            reject();
            // console.log('Nao sou senac');
            this.toast.create({ message: 'Acesso autorizado somente à Funcionários Senac', duration: 6000 }).present();
            return true;
          }
        }
        userState.unsubscribe();
      })

    })
  }

    // console.log('01 ionViewCanEnter called'); // a guarda de entrada da page
    //return true; // True pra que entre na página, se False não deixa entra na page


}
