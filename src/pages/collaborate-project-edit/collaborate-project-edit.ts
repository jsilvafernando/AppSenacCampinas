import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountProvider } from './../../providers/auth/auth';
import { MyprojectProvider } from '../../providers/myproject/myproject';

@IonicPage()
@Component({
  selector: 'page-collaborate-project-edit',
  templateUrl: 'collaborate-project-edit.html',
})
export class CollaborateProjectEditPage {
  form: FormGroup;
  title: string;
  projectname: string;
  description:string;
  user: any = {}; // preciso instanciar pra não dar erro...
  users: any = {};
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private formBuilder: FormBuilder,
    private myprojectProvider: MyprojectProvider,
    public authProvider: AccountProvider) {

      this.item = this.navParams.data.projects || {};

      // this.item = this.navParams.data.item || {};

      this.setupPageTitle();
      this.createForm();

      this.user = this.authProvider.getUserData();
      const subscribe = this.authProvider.gettUserData(this.user.primarykey).subscribe((usersData:any) => {
        subscribe.unsubscribe();
        this.users = usersData;
        this.createForm();

      });

    }

    private setupPageTitle() {
        this.title = 'Colaborar';
        this.projectname = this.item.name;
    }

    private createForm() {
      this.form = this.formBuilder.group({
        description: [this.description, Validators.required],
        keyproject: this.item.keyproject,
        nameproject: this.item.name,
        classekeyproject: [this.item.classekey],
        classeproject: [this.item.classe],
        zonekeyproject: [this.item.zonekey],
        zoneproject: [this.item.zone],
        coursekeyproject: [this.item.coursekey],
        courseproject: [this.item.course],
        name: [this.user.name],
        email: [this.user.email],
        classekey: [this.users.classekey],
        classe: [this.users.classeuser],
        zonekey: [this.users.zonekey],
        zone: [this.users.zoneuser],
        coursekey: [this.users.coursekey],
        course: [this.users.courseuser],

      });
    }

    onSubmit() {
      if (this.form.valid) {
        this.myprojectProvider.saveCollaborate(this.form.value, this.item.keyproject)
          .then(() => {
            this.toast.create({ message: 'Sua Colaboração foi salvo com sucesso.', duration: 3000 }).present();
            this.navCtrl.pop();
          }).catch(() => {
            this.toast.create({ message: 'Ocorreu algum erro ao salvar, por favor tente novamente.', duration: 3000 }).present();
          })
      }
    }


}
