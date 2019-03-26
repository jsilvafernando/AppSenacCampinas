import { MyprojectProvider } from '../../providers/myproject/myproject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AccountProvider } from './../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-myproject-edit',
  templateUrl: 'myproject-edit.html',
})
export class MyprojectEditPage {
  form: FormGroup;
  title: string;
  item: any;
  user: any = {}; // preciso instanciar pra não dar erro...
  users: any = {};
  projects: any = {};
  addUser: boolean;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private formBuilder: FormBuilder,
    public authProvider: AccountProvider,
    public auth: AngularFireAuth,
    private myprojectProvider: MyprojectProvider) {

      this.item = this.navParams.data.item || {};
      this.createForm();
      this.setupPageTitle();

      this.user = this.authProvider.getUserData();
      const subscribe = this.authProvider.gettUserData(this.user.primarykey).subscribe((usersData:any) => {
        subscribe.unsubscribe();
        this.users = usersData;
        this.createForm();

      });


  }

  private setupPageTitle() {
    if (this.navParams.data.item) {
      this.title = 'Alterando Projeto';
      this.addUser = true;
    } else {
      this.title = 'Novo Projeto';
      this.addUser = false;
    }
  }

  newAddUsers(){
    this.navCtrl.push('StudentsProjectListPage', { myproject: this.item} );
  }

  private createForm() {
    this.form = this.formBuilder.group({
      // userkey: [this.user.primarykey],
      name: [this.item.name, Validators.required],
      description: [this.item.description, Validators.required],
      monthstartyear: [this.item.monthstartyear],
      monthfinishyear: [this.item.monthfinishyear, Validators.required],
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
        this.myprojectProvider.saveProject(this.form.value, this.item.keyproject)
        .then(() => {
          this.toast.create({ message: 'Projeto salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        }).catch(() => {
          this.toast.create({ message: 'Ocorreu algum erro ao salvar o Projeto, por favor tente novamente.', duration: 3000 }).present();
        });
    }
    // if (this.form.valid) {
    //   this.myprojectProvider.save(this.form.value, this.item.key)
    //     .then(() => {
    //       this.toast.create({ message: 'Projeto do Usuário salvo com sucesso.', duration: 3000 }).present();
    //       this.navCtrl.pop();
    //     }).catch(() => {
    //       this.toast.create({ message: 'Ocorreu algum erro ao salvar, por favor tente novamente.', duration: 3000 }).present();
    //     })
    // }

    // if (this.item.key){
    //       this.myprojectProvider.saveProject(this.form.value, this.item.key)
    //       .then(() => {
    //         this.toast.create({ message: 'Projeto salvo com sucesso.', duration: 3000 }).present();
    //         // this.navCtrl.pop();
    //       }).catch(() => {
    //         this.toast.create({ message: 'Ocorreu algum erro ao salvar, por favor tente novamente.', duration: 3000 }).present();
    //       })

    // } else {
    //     const project = this.myprojectProvider.getAll().subscribe((projectData:any) => {
    //       project.unsubscribe();
    //       this.projects = projectData;
    //       console.log(this.projects);

    //       this.myprojectProvider.saveProject(this.form.value, this.projects.key)
    //         .then(() => {
    //           this.toast.create({ message: 'Projeto salvo com sucesso.', duration: 3000 }).present();
    //           // this.navCtrl.pop();
    //         }).catch(() => {
    //           this.toast.create({ message: 'Ocorreu algum erro ao salvar, por favor tente novamente.', duration: 3000 }).present();
    //         })
    //     });
    // }

  }


}

