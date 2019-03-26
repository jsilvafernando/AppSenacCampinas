import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabs: any[] = [];

  constructor() {
    this.tabs.push({ component: 'ProfilePage', title: 'Sobre', icon: 'information-circle' });
    this.tabs.push({ component: 'ProjectListPage', title: 'Projetos', icon: 'briefcase' });
    this.tabs.push({ component: 'MyprojectListPage', title: 'Meu(s) Projeto(s)', icon: 'clipboard' });
    //this.tabs.push({ component: 'UserinfoPage', title: 'Perfil', icon: 'person' });
  }
}
