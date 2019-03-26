import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CourseProvider {
  private PATH = 'courses/';

  constructor(private db: AngularFireDatabase) { }

  public getAll(zoneKey: string) {
    return this.db.list(this.PATH, ref => {
      if (zoneKey) {
        return ref.orderByChild('zoneKey').equalTo(zoneKey)
      } else {
        return ref.orderByChild('name')
      }
    }).snapshotChanges().map(changes => {
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
