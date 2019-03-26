import { AccountProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  form: FormGroup;

  constructor(
    public navCtrl: NavController, private formBuilder: FormBuilder,
    private authProvider: AccountProvider, private toast: ToastController) {

    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authProvider.sendPasswordResetEmail(this.form.value.email)
        .then((user: any) => {
          this.toast.create({ message: 'Um e-mail foi enviado para que você resete sua senha.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch(message => {
          this.toast.create({ message: message, duration: 3000 }).present();
          console.error(message);
        });
    }
  }

}
