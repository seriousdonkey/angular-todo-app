import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable()
export abstract class FirestoreService<T> {
  protected abstract path: string;

  constructor(
    @Inject(AngularFirestore) protected firestore: AngularFirestore
  ) {}

  collection$(queryFn?: QueryFn): Observable<T[]> {
    return this.firestore.collection<T>(`${this.path}`, queryFn).valueChanges();
  }

  async create(value: T) {
    const id = this.firestore.createId();
    return await this.collection.doc(id).set(Object.assign({}, { id }, value));
  }

  async update(id: string, value: T) {
    await this.collection.doc(id).update(value);
  }

  async delete(id: string) {
    return this.collection.doc(id).delete();
  }

  private get collection() {
    return this.firestore.collection<T>(`${this.path}`);
  }
}
