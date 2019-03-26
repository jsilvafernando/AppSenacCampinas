import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AccountProvider } from './../../providers/auth/auth';
import { ZoneProvider } from './../../providers/zone/zone';
import { CourseProvider } from './../../providers/course/course';
import { ClassesProvider } from './../../providers/classes/classes';
import { UnityCampusProvider } from './../../providers/unitycampus/unitycampus';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  form: FormGroup;

  zones: Observable<any[]>;
  courses: Observable<any[]>;
  classes: Observable<any[]>;
  unidades: Observable<any[]>;

  zoneItem:any;
  courseItem:any;
  classeItem:any;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authProvider: AccountProvider,
    private toast: ToastController,
    private zonesProvider: ZoneProvider,
    private classesProvider: ClassesProvider,
    private courseProvider: CourseProvider,
    private unidadesProvider: UnityCampusProvider) {

      this.createForm();
      this.zones = this.zonesProvider.getAll();
      this.courses = this.courseProvider.getAll(null);
      this.classes = this.classesProvider.getAll(null);
      this.unidades = this.unidadesProvider.getAll();

  }


  getZones() {
    this.courses = this.courseProvider.getAll(this.form.value.zone);
    const subscribez = this.zonesProvider.get(this.form.value.zone).subscribe(zoneData => {
      subscribez.unsubscribe();
      this.zoneItem = zoneData;
      console.log(this.zoneItem);
      this.form.controls['zoneuser'].setValue(this.zoneItem.name);
      console.log(this.zoneItem.name);
    });
  }

  getCourses() {
    this.classes = this.classesProvider.getAll(this.form.value.course);
    const subscribec = this.courseProvider.get(this.form.value.course).subscribe(courseData => {
      subscribec.unsubscribe();
      this.courseItem = courseData;
      console.log(this.courseItem);
      this.form.controls['courseuser'].setValue(this.courseItem.name);
      console.log(this.courseItem.name);
    });
  }

  getClasses() {
    const subscribe = this.classesProvider.get(this.form.value.classe).subscribe(classesData => {
      subscribe.unsubscribe();
      this.classeItem = classesData;
      console.log(this.classeItem);
      this.form.controls['classeuser'].setValue(this.classeItem.name);
      console.log(this.classeItem.name);
    });
  }


  private createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      zone: ['', Validators.required],
      zoneuser: [''],
      course: ['', Validators.required],
      courseuser: [''],
      classe: [''],
      classeuser: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      unityCampus: ['', Validators.required],
      privacypolicy: [false, Validators.required],
    });
  }


  onSubmit() {
    if (this.form.valid) {
      if (!this.form.value.privacypolicy){
        this.toast.create({ message: 'Por favor, leia a Política de Privacidade e Marque [✓] a Opção!!', duration: 6000 }).present();
      } else {
          this.authProvider.createAccount(this.form.value)
            .then(() => {
              this.toast.create({ message: 'Conta criada com sucesso. Por favor confirme seu e-mail antes de efetuar o login.', duration: 6000 }).present();
              this.navCtrl.pop();
            })
            .catch(message => {
              this.toast.create({ message: message, duration: 3000 }).present();
            });
      }      
    }
  }

  openPrivacyPolicy(){
    this.navCtrl.push('PrivacyPolicyPage');
  }


}
