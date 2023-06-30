import { TestBed } from '@angular/core/testing';
import { LogoutEffects } from './logout.effects';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { cold, hot } from 'jasmine-marbles';
import {
  ADD_ERROR_ACTION,
  LOGOUT_ACTION,
  LOGOUT_SUCCESS_ACTION,
} from '../auth.actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

class AngularFireAuthMock {
  signOut(): Observable<unknown> {
    return of('some dummy text'); // TODO: Dirty hack to jump into map function. Maybe refactor this
  }
}

describe('LogoutEffects', () => {
  let effects: LogoutEffects;
  let actions$: Observable<unknown>;
  const firebaseAuthMock = new AngularFireAuthMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogoutEffects,
        provideMockActions(() => actions$),
        { provide: AngularFireAuth, useValue: firebaseAuthMock },
      ],
    });

    effects = TestBed.inject(LogoutEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('logout$', () => {
    it('should return logoutSuccess action', () => {
      actions$ = hot('a', { a: { type: LOGOUT_ACTION } });
      const expected = cold('b', { b: { type: LOGOUT_SUCCESS_ACTION } });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('should return addError action', () => {
      spyOn(firebaseAuthMock, 'signOut').and.callFake(() => {
        return throwError(() => new Error(''));
      });
      actions$ = hot('a', { a: { type: LOGOUT_ACTION } });
      const expected = cold('b', {
        b: { type: ADD_ERROR_ACTION, message: 'unknown logout error' },
      });

      expect(effects.logout$).toBeObservable(expected);
    });
  });
});
