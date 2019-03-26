import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileProvider {
  private PATH = 'usersComplements/';
  private PATHuser = 'usersComplements/';

  constructor(private db: AngularFireDatabase, public auth: AngularFireAuth) {
    if (!this.auth.auth.currentUser) return; // se o usuário nao estiver autenticado retorna e não continua

    this.PATH += this.auth.auth.currentUser.uid; // path do usuario com o id dEle logado...
  }

  public getAll() {
    return this.db.object(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return { key:changes.key, ...changes.payload.val() };
      });
  }

  public gettUserComplement(userKey: string){
    return this.db.object(this.PATHuser + userKey)
      .snapshotChanges()
      .map(changes => {
        return { key:changes.key, ...changes.payload.val() };
      })
  }


  public save(item: any, key: string) {
    // o método update retorna uma promisse e o método push retorna um outro tipo de objeto
    // retorna uma promessa, pra saber quando a função foi executada com sucesso
    // uma promisse retorna o then e o catch o push só retorno o then
    // segure o ctrl e clique no update que verás quais objetos eles retornam
    return new Promise((resolve, reject) => {
      if (item.key) { // se o item.key tem valor, significa que é um update
        this.db.list(this.PATH).update(key, item)
          .then(() => resolve()) // neste caso com sucesso eu chamo o resolve
          .catch((e) => reject(e)); // catch caso venha um erro reu chamo o reject
      } else { // se não é um insert
        this.db.list(this.PATHuser).update(this.auth.auth.currentUser.uid, item)
          .then(() => resolve());
      }
    });
  }

  public remove() {
    return this.db.list(this.PATHuser).remove(this.auth.auth.currentUser.uid);
  }


}
