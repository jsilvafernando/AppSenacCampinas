import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MyprojectProvider } from './../../providers/myproject/myproject';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-project-view',
  templateUrl: 'project-view.html',
})
export class ProjectViewPage {
item:any;
userprojects: Observable<any[]>;
project: any = {};
rankingprojects: any;
ratingprojects: any = {};
ratingvalue:number;
readingvalue:boolean;

  constructor(public navCtrl: NavController,
              private myprojectProvider: MyprojectProvider,
              private toast: ToastController,
              public auth: AngularFireAuth,
              public navParams: NavParams) {
    this.item = this.navParams.data.projects || {};
    this.userprojects = this.myprojectProvider.getUserProject(this.item.key);
    this.recalcula();


  }

  recalcula(){
    const subscriberanking = this.myprojectProvider.getRankingProject(this.item.key).subscribe((rankingData:any) => {
      subscriberanking.unsubscribe();
      this.rankingprojects = rankingData;

          const subscriberating = this.myprojectProvider.getRatingProject(this.item.key).subscribe((ratingData:any) => {
            subscriberating.unsubscribe();
            this.ratingprojects = ratingData;
            if (this.ratingprojects.key == null){
              this.ratingvalue = 0;
              this.readingvalue= false;
            } else {
              this.ratingvalue = parseInt(this.ratingprojects.value);
              this.readingvalue = true;
            }
            this.CreateView();
          });
    });

  }

  numberstars(valor){
    this.myprojectProvider.AddProjectRating(this.item.key, valor, this.rankingprojects, this.ratingvalue)
    .then(() => {
      this.recalcula();
      this.toast.create({ message: 'Seu voto no Projeto foi enviado com sucesso.', duration: 6000 }).present();
    }).catch(() => {
      this.toast.create({ message: 'Ocorreu algum erro ao votar no Projeto, por favor tente novamente.', duration: 6000 }).present();
    });

  }

  private CreateView(){
    this.project = {
      name: this.item.name,
      description: this.item.description,
      monthstartyear: this.item.monthstartyear,
      monthfinishyear: this.item.monthfinishyear,
      classekey: this.item.classekey,
      classe: this.item.classe,
      zonekey: this.item.zonekey,
      zone: this.item.zone,
      coursekey: this.item.coursekey,
      course: this.item.course,
      keyproject: this.item.key,
      rankingstar1: this.rankingprojects.star1,
      rankingstar2: this.rankingprojects.star2,
      rankingstar3: this.rankingprojects.star3,
      rankingstar4: this.rankingprojects.star4,
      rankingstar5: this.rankingprojects.star5,
      ratingvalue: this.ratingvalue,
      readingvalue: this.readingvalue,
    }
    console.log(this.project);
  }

  viewUserPerfil(user:any) {
    this.navCtrl.push('ProjectViewPerfilPage', { users: user });
  }

  helpProject(project: any) {
    this.navCtrl.push('HelpProjectEditPage', { projects: project });
  }

  cooperateProject(project: any) {
    this.navCtrl.push('CollaborateProjectEditPage', { projects: project });
  }

}
