import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';
import { authStateChanged } from 'src/app/auth/auth.actions';
import { AuthFacade } from 'src/app/auth/facade/auth.facade';
import { CategorieDataService } from 'src/app/services/categories-data.service';
import { loadCategoriesSuccess } from './todo.actions';

@Injectable()
export class TodoEffects {
  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authStateChanged),
      switchMap((action) => {
        console.log('Load Categories...');
        if (action.user !== null) {
          return this.categoriesDataService.collection$((ref) =>
            ref.where('userId', '==', action.user?.userId)
          );
        }

        return of([]);
      }),
      map((categories) => {
        return loadCategoriesSuccess({ categories });
      })
    );
  });

  constructor(
    private actions$: Actions,
    private categoriesDataService: CategorieDataService,
    private authFacade: AuthFacade
  ) {}
}
