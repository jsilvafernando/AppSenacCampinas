import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class MyprojectProvider {
  private PATH_USER_PROJECTS = 'usersProjects/';
  private PATH_USERS_PROJECTS = 'usersProjects/';
  private PATH_PROJECTS_USERS = 'projectsUsers/';
  private PATH_PROJECTS_RATING = 'projectRating/';
  private PATH_PROJECTS_RANKING = 'projectRanking/';
  private PATH_PROJECTS_HELP = 'projectHelp/';
  private PATH_USER_HELP = 'usersProjectsHelp/';
  private PATH_PROJECTS_COLLABORATE = 'projectCollaborate/';
  private PATH_USERS_COLLABORATE = 'usersProjectsCollaborate/';

  private PATH = 'Projects/';

  public userkey: string;
  public userName: string;
  public userEmail: string;

  constructor(private db: AngularFireDatabase, public auth: AngularFireAuth) {
    if (!this.auth.auth.currentUser) return; // se o usuário nao estiver autenticado retorna e não continua
    this.PATH_USER_PROJECTS += this.auth.auth.currentUser.uid; // path do usuario com o id dEle logado...
    this.userkey = this.auth.auth.currentUser.uid;
    this.userName = this.auth.auth.currentUser.displayName;
    this.userEmail = this.auth.auth.currentUser.email;
  }

  public getAll() {
    return this.db.list(this.PATH_USER_PROJECTS)
      .snapshotChanges()
      .map(changes => {
        return changes.map(m => ({ key: m.key, ...m.payload.val() }));
      });
  }

  public getMyProject(userKey: string){
    return this.db.object(this.PATH + userKey)
      .snapshotChanges()
      .map(changes => {
        return { key:changes.key, ...changes.payload.val() };
      })
  }

  public getRankingProject(keyprojeto: string){
    return this.db.object(this.PATH_PROJECTS_RANKING + keyprojeto)
      .snapshotChanges()
      .map(changes => {
        return { key:changes.key, ...changes.payload.val() };
      })
  }

  public getRatingProject(keyprojeto: string){
    return this.db.object(this.PATH_PROJECTS_RATING + keyprojeto +'/'+ this.userkey)
      .snapshotChanges()
      .map(changes => {
        return { key:changes.key, ...changes.payload.val() };
      })

  }

  getUserProject(keyprojeto:string){
    return this.db.list(this.PATH_PROJECTS_USERS + keyprojeto)
      .snapshotChanges()
      .map(changes => {
        return changes.map(p => ({ key: p.key, ...p.payload.val() }))
      });
  }

  getProjectHelp(keyprojeto:string){
    return this.db.list(this.PATH_PROJECTS_HELP + keyprojeto)
      .snapshotChanges()
      .map(changes => {
        return changes.map(p => ({ key: p.key, ...p.payload.val() }))
      });
  }

  getUserProjectHelp(userKey: string){
    return this.db.list(this.PATH_USER_HELP + userKey)
      .snapshotChanges()
      .map(changes => {
        return changes.map(p => ({ key: p.key, ...p.payload.val() }))
      });
  }

  // private PATH_PROJECTS_COLLABORATE = 'projectCollaborate/';
  // private PATH_USERS_COLLABORATE = 'usersProjectsCollaborate/';

  getProjectCollaborate(keyprojeto:string){
    return this.db.list(this.PATH_PROJECTS_COLLABORATE + keyprojeto)
      .snapshotChanges()
      .map(changes => {
        return changes.map(p => ({ key: p.key, ...p.payload.val() }))
      });
  }

  getUserProjectCollaborate(userKey: string){
    return this.db.list(this.PATH_USERS_COLLABORATE + userKey)
      .snapshotChanges()
      .map(changes => {
        return changes.map(p => ({ key: p.key, ...p.payload.val() }))
      });
  }

  getAllProjects(courseKey:string){
    return this.db.list(this.PATH, ref =>{
      if (courseKey) {
        return ref.orderByChild('coursekey').equalTo(courseKey)
      } else {
        return ref.orderByChild('name')
      }
    })
      .snapshotChanges()
      .map(changes => {
        return changes.map(p => ({ key: p.key, ...p.payload.val() }))
      });
  }

  getAllProjectsZones(zoneKey:string){
    return this.db.list(this.PATH, ref =>{
      if (zoneKey) {
        return ref.orderByChild('zonekey').equalTo(zoneKey)
      } else {
        return ref.orderByChild('name')
      }
    })
      .snapshotChanges()
      .map(changes => {
        return changes.map(m => ({ key: m.key, ...m.payload.val() }))
      });
  }

  public save(item: any, key: string) {
    // o método update retorna uma promisse e o método push retorna um outro tipo de objeto
    // retorna uma promessa, pra saber quando a função foi executada com sucesso
    // uma promisse retorna o then e o catch o push só retorno o then
    // segure o ctrl e clique no update que verás quais objetos eles retornam
    return new Promise((resolve, reject) => {
      if (key) { // se o item.key tem valor, significa que é um update
        this.db.list(this.PATH_USER_PROJECTS).update(key, item) // a key é a chave do projeto e o item é o
          .then(() => resolve()) // neste caso com sucesso eu chamo o resolve
          .catch((e) => reject(e)); // catch caso venha um erro reu chamo o reject
      } else { // se não é um insert
        this.db.list(this.PATH_USER_PROJECTS).push(item)
          .then(() => resolve());
          // .then( (resp) => {console.log(resp) }  )
      }
    });
  }

  public saveHelp(item: any, keyproject: string) {
    return new Promise((resolve, reject) => {
      const pathprojectHelp = this.PATH_PROJECTS_HELP+keyproject+'/'+this.userkey;
      const pathuserHelp = this.PATH_USER_HELP + this.userkey+'/'+keyproject;


      let salvar = {}
      salvar[pathprojectHelp] = item;
      salvar[pathuserHelp] = item

      this.db.object('/').update(salvar)
       .then(() => resolve())
       .catch((e) => reject(e));

    });
  }

  public saveCollaborate(item: any, keyproject: string) {
    return new Promise((resolve, reject) => {
      const pathprojecCollaborate = this.PATH_PROJECTS_COLLABORATE+keyproject+'/'+this.userkey;
      const pathuserCollaborate = this.PATH_USERS_COLLABORATE + this.userkey+'/'+keyproject;


      let salvar = {}
      salvar[pathprojecCollaborate] = item;
      salvar[pathuserCollaborate] = item

      this.db.object('/').update(salvar)
       .then(() => resolve())
       .catch((e) => reject(e));

    });
  }

  public saveProject(item: any, key: string) {
      return new Promise((resolve, reject) => {
          if (key) {
              this.db.list(this.PATH).update(key, item) // a key é a chave do projeto e o item é o dados do projeto no form
              .then(() => resolve()) // neste caso com sucesso eu chamo o resolve
              .catch((e) => reject(e)); // catch caso venha um erro reu chamo o reject
          } else { // se não é um insert
            this.db.list(this.PATH).push(item)
              .then((result: any) => {
                const project = {
                  name: item.name,
                  description: item.description,
                  monthstartyear: item.monthstartyear,
                  monthfinishyear: item.monthfinishyear,
                  classekey: item.classekey,
                  classe: item.classe,
                  zonekey: item.zonekey,
                  zone: item.zone,
                  coursekey: item.coursekey,
                  course: item.course,
                  keyproject:result.key,
                };
                const userproject = {
                  userkey: this.userkey,
                  username: this.userName,
                  useremail: this.userEmail,
                }
                const ranking={
                  star5: 0,
                  star4: 0,
                  star3: 0,
                  star2: 0,
                  star1: 0,
                }

                this.db.list(this.PATH_USER_PROJECTS).push(project)
                .then(() => resolve());
                this.db.list(this.PATH_PROJECTS_RANKING).update(result.key, ranking)
                .then(() => resolve());
                this.db.list(this.PATH_PROJECTS_USERS+'/'+result.key).push(userproject)
                .then( () => resolve());
              });
        }
      });
  }

  public remove(keyproject: string, key:string) {
    //usersProjects
    this.db.list(this.PATH_USER_PROJECTS).remove(key);
    this.db.list(this.PATH_USER_PROJECTS).remove(keyproject);
    //Projects
    this.db.list(this.PATH).remove(keyproject);
    //projectUsers
    this.db.list(this.PATH_PROJECTS_USERS).remove(keyproject);
    //projectRating
    this.db.list(this.PATH_PROJECTS_RATING).remove(keyproject);
    //projectRanking
    this.db.list(this.PATH_PROJECTS_RANKING).remove(keyproject);
    //projectHelp
    this.db.list(this.PATH_PROJECTS_HELP).remove(keyproject);
    //projectCollaborate
    this.db.list(this.PATH_PROJECTS_COLLABORATE).remove(keyproject);

    const subscribeu = this.db.list(this.PATH_PROJECTS_USERS, ref =>{
        return ref.orderByChild('key').equalTo(keyproject)
    })
      .snapshotChanges()
      .map(changes => {
        return changes.map(p => ({ key: p.key, ...p.payload.val() }))
      })
    .subscribe(items => { // ler todos usuários
      subscribeu.unsubscribe();
      const pathDelete = 'usersProjects/';
      items.forEach(user => {
        this.db.list(pathDelete+user.key).remove(keyproject);
      });
    });

  }

  public AddProjectRating(projectkey:string, rating:number, projectranking:any, previousrating:number ){
    return new Promise((resolve, reject) => {

      let rankingstar5: number;
      let rankingstar4: number;
      let rankingstar3: number;
      let rankingstar2: number;
      let rankingstar1: number;
      rankingstar5= projectranking.star5;
      rankingstar4= projectranking.star4;
      rankingstar3= projectranking.star3;
      rankingstar2= projectranking.star2;
      rankingstar1= projectranking.star1;


      if (previousrating == 5){ rankingstar5 -=1; }
      if (previousrating == 4){ rankingstar4 -=1; }
      if (previousrating == 3){ rankingstar3 -=1; }
      if (previousrating == 2){ rankingstar2 -=1; }
      if (previousrating == 1){ rankingstar1 -=1; }

      if (rating == 5) { rankingstar5 +=1;}
      if (rating == 4) { rankingstar4 +=1;}
      if (rating == 3) { rankingstar3 +=1;}
      if (rating == 2) { rankingstar2 +=1;}
      if (rating == 1) { rankingstar1 +=1;}

      const ranking={
        star5: rankingstar5,
        star4: rankingstar4,
        star3: rankingstar3,
        star2: rankingstar2,
        star1: rankingstar1,
      }
      const ratingvalor={
        value:rating,
      }

      const pathRating = this.PATH_PROJECTS_RATING+projectkey+'/'+this.userkey;
      const pathRanking = this.PATH_PROJECTS_RANKING + projectkey;

      let salvar = {}
      salvar[pathRating] = ratingvalor;
      salvar[pathRanking] = ranking

      this.db.object('/').update(salvar)
       .then(() => resolve())
       .catch((e) => reject(e));

    });

  }

  public AddUserProject(projectkey: string, userproject:any, projetouser:any, userkey:string){
    return new Promise((resolve, reject) => {
      this.db.list(this.PATH_PROJECTS_USERS+'/'+projectkey).push(userproject)
      .then(() => resolve());
      this.db.list(this.PATH_USERS_PROJECTS+'/'+userkey).update(projectkey, projetouser)
      .then(() => resolve())
      .catch((e) => reject(e));
    });

  }
//  private PATH_USERS_PROJECTS = 'usersProjects/';
//  private PATH_PROJECTS_USERS = 'projectsUsers/';

  public RemoveUserProject(projectuser:string, projeto:any, userkey:string){
    this.db.list(this.PATH_PROJECTS_USERS+projeto.keyproject).remove(projectuser);
    this.db.list(this.PATH_USERS_PROJECTS+userkey).remove(projeto.keyproject);

  }




}
