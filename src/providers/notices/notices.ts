import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class NoticesProvider {
  private PATH = 'notices/';

  constructor(public auth: AngularFireAuth,
    private db: AngularFireDatabase) {}

    getAll(){
      return this.db.list(this.PATH)
        .snapshotChanges()
        .map(changes => {
          return changes.map(m => ({key: m.key, ...m.payload.val() }));
        });
    }

}
