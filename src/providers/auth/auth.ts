import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountProvider {
  private PATH = 'users/';
  emailsenac: string;

  users:Observable<any[]>;

  // auth veio por injeção de dependência...
  constructor(public auth: AngularFireAuth, private db: AngularFireDatabase) { }

  public createAccount(user: any) {
    return new Promise((resolve, reject) => {
      this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((firebaseUser: firebase.User) => {
          this.emailsenac = user.email.split('@');

          if (this.emailsenac[1] == 'sp.senac.br') {
            this.db.object(this.PATH + firebaseUser.uid).set({ name: user.name, email: user.email, unityCampus: user.unityCampus, verified: true, zonekey: user.zone, zoneuser: user.zoneuser, coursekey: '', courseuser: '', classekey: '', classeuser:''  })
          } else {
            this.db.object(this.PATH + firebaseUser.uid).set({ name: user.name, email: user.email, unityCampus: user.unityCampus, verified: false, zonekey: user.zone, zoneuser: user.zoneuser, coursekey: user.course, courseuser: user.courseuser, classekey: user.classe, classeuser: user.classeuser })
          }

          this.db.object(this.PATH + firebaseUser.uid).update({ emailVerified: false, email: user.email });
          firebaseUser.updateProfile({ displayName: user.name, photoURL: null });
          firebaseUser.sendEmailVerification();

          this.signOut();
          resolve();
        })
        .catch(e => {
          reject(this.handlerError(e));
        });
    });
  }

  public login(user: any) {
    return new Promise((resolve, reject) => {
      this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((firebaseUser: firebase.User) => {
          // Se o email do usuario foi verificado eu atualizo a informação
          if (firebaseUser.emailVerified) {
            this.db.object(this.PATH + firebaseUser.uid).update({ emailVerified: true });
          }

          const subscribe = this.gettUserData(firebaseUser.uid).subscribe((userData:any) => {
            subscribe.unsubscribe();
              resolve({ emailVerified: firebaseUser.emailVerified, email: firebaseUser.email, userkey: firebaseUser.uid,
                verified: userData.verified, zoneuser: userData.zoneuser, courseuser: userData.courseuser, classeuser: userData.classeuser });
          });

        })
        .catch(e => {
          reject(this.handlerError(e));
        });
    });
  }

  public sendPasswordResetEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.auth.auth.sendPasswordResetEmail(email)
        .then(() => {
          resolve();
        })
        .catch(e => {
          reject(this.handlerError(e));
        });;
    });
  }

  public getUserData() {
    let user = { name: '', email: '', primarykey: '' }; // criando um objeto
    if (this.auth.auth.currentUser) { // se o usuario está logado, se a propriedade currentUser estiver preenchida
        user.name = this.auth.auth.currentUser.displayName, // pelo currentUser pega varias propriedades ... .displayName...etc...
        user.email = this.auth.auth.currentUser.email,
        user.primarykey = this.auth.auth.currentUser.uid
    }

    return user;
  }

  public gettUserData(userKey: string){
    // return this.users = this.db.list(this.PATH + userKey).valueChanges()
    return this.db.object(this.PATH + userKey)
      .snapshotChanges()
      .map(changes => {
        return { key:changes.key, ...changes.payload.val() };
      })
  }


  getAllZones(zoneKey:string){
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

  getTotalZones(key:string){
    return this.db.list(this.PATH, ref => ref.orderByChild('zonekey').equalTo(key))
      .snapshotChanges()
      .map(changes => {
        return changes.length;
      })
  }

  getTotalCourses(key:string){
    return this.db.list(this.PATH, ref => ref.orderByChild('coursekey').equalTo(key))
      .snapshotChanges()
      .map(changes => {
        return changes.length;
      })
  }

  getAll(courseKey:string){
    return this.db.list(this.PATH, ref =>{
      if (courseKey) {
        return ref.orderByChild('coursekey').equalTo(courseKey)
      } else {
        return ref.orderByChild('name')
      }
    })
      .snapshotChanges()
      .map(changes => {
        return changes.map(m => ({ key: m.key, ...m.payload.val() }))
      });
  }

  public signOut() {
    this.auth.auth.signOut();
    // this.navCtrl.parent.parent.setRoot('ProfilePage'); //redirecionar para página de login

  }

  public save(users: any, key: string) {
    // o método update retorna uma promisse e o método push retorna um outro tipo de objeto
    // retorna uma promessa, pra saber quando a função foi executada com sucesso
    // uma promisse retorna o then e o catch o push só retorno o then
    // segure o ctrl e clique no update que verás quais objetos eles retornam
    return new Promise((resolve, reject) => {
      if (users.key) { // se o users.key tem valor, significa que é um update
        this.db.list(this.PATH).update(key, users)
          .then(() => resolve()) // neste caso com sucesso eu chamo o resolve
          .catch((e) => reject(e)); // catch caso venha um erro eu chamo o reject
      } else { // se não é um insert
        this.db.list(this.PATH).push(users)
          .then(() => resolve());
      }
    });
  }

  private handlerError(error: any) {
    let message = '';
    if (error.code == 'auth/email-already-in-use') {
      message = 'O e-mail informado já está sendo usado.';
    } else if (error.code == 'auth/invalid-email') {
      message = 'O e-mail informado é inválido.';
    } else if (error.code == 'auth/weak-password') {
      message = 'A senha informada é muito fraca.';
    } else if (error.code == 'auth/user-not-found') {
      message = 'Usuário não encontrado.';
    } else if (error.code == 'auth/wrong-password') {
      message = 'Usuário/senha inválido(s).';
    } else {
      message = 'Ocorreu algum erro, por favor tente novamente.';
    }

    return message;
  }
}
