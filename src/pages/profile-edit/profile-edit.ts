import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfileProvider } from './../../providers/profile/profile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountProvider } from './../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  form: FormGroup;
  title: string;
  item: any;
  user: any = {}; // preciso instanciar pra não dar erro...

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private formBuilder: FormBuilder,
    public authProvider: AccountProvider,
    private profileProvider: ProfileProvider) {

    this.user = this.authProvider.getUserData();
      // é preciso instanciar o objeto para não dar erro...
    // como vai utilizar a mesma tela para inserir e editar, é preciso usar o navParams
    this.item = this.navParams.data.item || {};
    this.setupPageTitle();
    this.createForm();
  }

  private setupPageTitle() {
    if (this.navParams.data.item) {
      this.title = 'Alterando pefil';
    } else {
      this.title = 'Novo perfil';
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      formacao: [this.item.formacao, Validators.required],
      experiencia: [this.item.experiencia],
      interesses: [this.item.interesses],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.profileProvider.save(this.form.value, this.item.key)
        .then(() => {
          this.toast.create({ message: 'Perfil salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        }).catch(() => {
          this.toast.create({ message: 'Ocorreu algum erro ao salvar, por favor tente novamente.', duration: 3000 }).present();
        })
    }
  }

}
