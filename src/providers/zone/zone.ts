import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ZoneProvider {
  private PATH = 'zones/';

  constructor(private db: AngularFireDatabase) { }

  public getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('name')).snapshotChanges().map(changes => {
      return changes.map(m => ({ key: m.key, ...m.payload.val() }));
    });
  }


  public get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }


}
