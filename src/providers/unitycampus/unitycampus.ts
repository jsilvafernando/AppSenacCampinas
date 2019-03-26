import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UnityCampusProvider {
  private PATH = 'unitycampus/';

  constructor(private db: AngularFireDatabase) { }

  public getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('name')).snapshotChanges().map(changes => {
      return changes.map(m => ({ key: m.key, ...m.payload.val() }));
    });
  }

}
