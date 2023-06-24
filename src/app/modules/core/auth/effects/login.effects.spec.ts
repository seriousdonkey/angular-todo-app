import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginEffects } from './login.effects';
import { cold, hot } from 'jasmine-marbles';
import {
  ADD_ERROR_ACTION,
  LOGIN_ACTION,
  LOGIN_FAILED_ACTION,
  LOGIN_SUCCESS_ACTION,
} from '../auth.actions';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoginErrorType } from '../login-error';
import { STOP_LOADING_ACTION } from '../../ui/ui.actions';
import { Observable, of, throwError } from 'rxjs';
import { FirebaseError } from 'firebase/app';

class AngularFireAuthMock {
  signInWithEmailAndPassword(): Observable<unknown> {
    return of({ user: {} });
  }
}

describe('LoginEffects', () => {
  describe('login$', () => {
    let effects: LoginEffects;
    let actions$: Observable<unknown>;
    const firebaseAuthMock = new AngularFireAuthMock();

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LoginEffects,
          provideMockActions(() => actions$),
          { provide: AngularFireAuth, useValue: firebaseAuthMock },
        ],
      });

      effects = TestBed.inject(LoginEffects);
    });

    it('should be created', () => {
      expect(effects.login$).toBeTruthy();
    });

    it('should login', () => {
      actions$ = hot('a', {
        a: {
          type: LOGIN_ACTION,
          email: 'some email',
          password: 'some password',
        },
      });
      const expected = cold('b', {
        b: { type: LOGIN_SUCCESS_ACTION },
      });

      expect(effects.login$).toBeObservable(expected);
    });

    describe('handle errors', () => {
      const testcases = [
        {
          code: 'auth/invalid-email',
          expectedErrorType: LoginErrorType.INVALID_EMAIL,
        },
        {
          code: 'auth/wrong-password',
          expectedErrorType: LoginErrorType.WRONG_PASSWORD,
        },
        {
          code: 'auth/user-disabled',
          expectedErrorType: LoginErrorType.USER_DISABLED,
        },
        {
          code: 'auth/user-not-found',
          expectedErrorType: LoginErrorType.USER_NOT_FOUND,
        },
        {
          code: 'unknown error code',
          expectedErrorType: LoginErrorType.UNKNOWN,
        },
      ];

      testcases.forEach((testcase) => {
        it(`should return ${testcase.code} loginFailed action`, () => {
          const err = new FirebaseError(testcase.code, 'some error message');
          spyOn(firebaseAuthMock, 'signInWithEmailAndPassword').and.callFake(
            () => {
              return throwError(() => err);
            }
          );

          actions$ = hot('a', {
            a: {
              type: LOGIN_ACTION,
              email: 'some email',
              password: 'some password',
            },
          });
          const expected = cold('b', {
            b: {
              type: LOGIN_FAILED_ACTION,
              message: 'some error message',
              errorType: testcase.expectedErrorType,
            },
          });

          expect(effects.login$).toBeObservable(expected);
        });
      });
    });
  });

  describe('loginSuccess$', () => {
    let effects: LoginEffects;
    let actions$: Observable<unknown>;
    let firebaseAuthMock: AngularFireAuth;

    beforeEach(() => {
      firebaseAuthMock = {} as AngularFireAuth;

      TestBed.configureTestingModule({
        providers: [
          LoginEffects,
          provideMockActions(() => actions$),
          { provide: AngularFireAuth, useValue: firebaseAuthMock },
        ],
      });

      effects = TestBed.inject(LoginEffects);
    });

    it('should be created', () => {
      expect(effects.loginSuccess$).toBeTruthy();
    });

    it('should dispatch stopLoading action', () => {
      actions$ = hot('a', {
        a: { type: LOGIN_SUCCESS_ACTION },
      });
      const expected = hot('a', {
        a: { type: STOP_LOADING_ACTION },
      });

      expect(effects.loginSuccess$).toBeObservable(expected);
    });
  });

  describe('loginFailed$', () => {
    let effects: LoginEffects;
    let firebaseAuthMock: AngularFireAuth;

    beforeEach(() => {
      firebaseAuthMock = {} as AngularFireAuth;

      const actions$ = hot('a', {
        a: {
          type: LOGIN_FAILED_ACTION,
          message: 'some error',
          errorType: LoginErrorType.UNKNOWN,
        },
      });

      TestBed.configureTestingModule({
        providers: [
          LoginEffects,
          provideMockActions(() => actions$),
          { provide: AngularFireAuth, useValue: firebaseAuthMock },
        ],
      });

      effects = TestBed.inject(LoginEffects);
    });

    it('should be created', () => {
      expect(effects.loginFailedAddError$).toBeTruthy();
      // expect(effects.loginFailedStopLoading$).toBeTruthy();
    });

    it('should dispatch addError action', () => {
      const expected = hot('a', {
        a: { type: ADD_ERROR_ACTION, message: 'some error' },
      });

      expect(effects.loginFailedAddError$).toBeObservable(expected);
    });

    it('should dispatch stopLoading action', () => {
      const expected = cold('a', {
        a: { type: STOP_LOADING_ACTION },
      });

      expect(effects.loginFailedStopLoading$).toBeObservable(expected);
    });
  });
});
