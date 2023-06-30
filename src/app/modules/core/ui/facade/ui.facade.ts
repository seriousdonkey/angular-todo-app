import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addMenuItemAction, startLoading, stopLoading } from '../ui.actions';
import { Observable } from 'rxjs';
import { selectIsLoading, selectMenu } from '../ui.selector';
import { SidebarItem, SidebarMenu } from '../../models/sidebar.model';

@Injectable({ providedIn: 'root' })
export class UiFacade {
  public get isLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading);
  }

  public get menu$(): Observable<SidebarMenu[]> {
    return this.store.select(selectMenu);
  }

  constructor(private store: Store) {}

  startLoading() {
    this.store.dispatch(startLoading());
  }

  stopLoading() {
    this.store.dispatch(stopLoading());
  }

  addMenu(title: string, items: SidebarItem[]) {
    this.store.dispatch(addMenuItemAction({ menuItem: { title, items } }));
  }
}
