import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-students-project-add',
  templateUrl: 'students-project-add.html',
})
export class StudentsProjectAddPage {
  project: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.project = this.navParams.data.users || {};
    console.log(this.project)

  }


}
