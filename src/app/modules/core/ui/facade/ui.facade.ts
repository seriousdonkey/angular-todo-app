import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../ui.actions';
import { Observable } from 'rxjs';
import { selectIsLoading } from '../ui.selector';

@Injectable({ providedIn: 'root' })
export class UiFacade {
  public get isLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading);
  }

  constructor(private store: Store) {}

  startLoading() {
    this.store.dispatch(startLoading());
  }

  stopLoading() {
    this.store.dispatch(stopLoading());
  }
}
