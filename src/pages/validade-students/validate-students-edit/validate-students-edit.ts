import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AccountProvider } from './../../../providers/auth/auth';
import { ClassesProvider } from './../../../providers/classes/classes';

@IonicPage()
@Component({
  selector: 'page-validate-students-edit',
  templateUrl: 'validate-students-edit.html',
})
export class ValidateStudentsEditPage {
  form: FormGroup;
  title: string;
  users: any;

  classes: Observable<any[]>;
  classeItem:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private toast: ToastController,
              private classesProvider: ClassesProvider,
              private usersProvider: AccountProvider) {
      this.users = this.navParams.data.users || {};
      this.SetupPageTitle();
      this.createForm();

      const subscribe = this.usersProvider.gettUserData(this.navParams.data.users.key).subscribe(usersData => {
        subscribe.unsubscribe();
        this.users = usersData;
        this.classes = this.classesProvider.getAll(this.users.coursekey);
      });

  }

  private SetupPageTitle(){
    if (this.navParams.data.users){
      this.title = 'Validando usuário';
    }
  }


  getClasses() {
    this.classes = this.classesProvider.getAll(this.users.coursekey);
    const subscribe = this.classesProvider.get(this.form.value.classekey).subscribe((classesData:any) => {
      subscribe.unsubscribe();
      this.classeItem = classesData;
      console.log(this.classeItem);
      this.form.controls['classeuser'].setValue(this.classeItem.name);
      console.log(this.classeItem.name);
    });
  }


  private createForm(){
    this.form = this.formBuilder.group({
      key:[this.users.key],
      name: [this.users.name, Validators.required],
      zoneuser: [this.users.zoneuser],
      courseuser: [this.users.courseuser],
      classekey: [this.users.classekey],
      classeuser: [''],
      email:  [this.users.email, Validators.required],
      verified: [this.users.verified, Validators.required],
    });
  }

  onSubmit(){
    if (this.form.valid) {
      this.usersProvider.save(this.form.value, this.form.value.key)
      .then(() => {
        this.toast.create({ message: 'Usuário validado com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      }).catch(() => {
        this.toast.create({ message: 'Ocorreu algum erro ao salvar, por favor tente novamente.', duration: 3000 }).present();
      })

    }
  }


}
