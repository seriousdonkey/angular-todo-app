import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../pages/todo/models/category.model';
import { selectCategories } from '../store/todo/todo.selector';

@Injectable({ providedIn: 'root' })
export class TodoFacade {
  public get categories$(): Observable<Category[]> {
    return this.store.select(selectCategories);
  }

  constructor(private store: Store) {}
}
