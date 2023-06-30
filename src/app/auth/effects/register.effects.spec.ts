import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RegisterEffects } from './register.effects';
import {
  REGISTER_ACTION,
  REGISTER_FAILED_ACTION,
  UPDATE_DISPLAYNAME_ACTION,
  UPDATE_DISPLAYNAME_SUCCESS_ACTION,
} from '../auth.actions';
import { cold, hot } from 'jasmine-marbles';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import * as firebase from 'firebase/compat';
import { SignupErrorType } from '../signup-error';
import { FirebaseError } from 'firebase/app';

class AngularFireAuthMock {
  user = {} as firebase.default.auth.UserCredential;

  createUserWithEmailAndPassword() {
    return of(this.user);
  }
}

class UserCredentialMock {
  user: UserMock;

  constructor(user: UserMock) {
    this.user = user;
  }
}

class UserMock {
  updateProfile(profile: { displayName: string }) {
    return of(profile.displayName);
  }
}

describe('RegisterEffects', () => {
  describe('register$', () => {
    let effects: RegisterEffects;
    let actions$: Observable<unknown>;
    const firebaseAuthMock = new AngularFireAuthMock();

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          RegisterEffects,
          provideMockActions(() => actions$),
          { provide: AngularFireAuth, useValue: firebaseAuthMock },
        ],
      });

      effects = TestBed.inject(RegisterEffects);
    });

    describe('register$', () => {
      it('should be created', () => {
        expect(effects.register$).toBeTruthy();
      });

      it('should return updateDisplayName action', () => {
        actions$ = hot('a', {
          a: {
            type: REGISTER_ACTION,
            email: 'some email',
            password: 'some password',
            username: 'some display name',
          },
        });
        const expected = cold('b', {
          b: {
            type: UPDATE_DISPLAYNAME_ACTION,
            user: firebaseAuthMock.user,
            displayName: 'some display name',
          },
        });

        expect(effects.register$).toBeObservable(expected);
      });

      describe('handle errors', () => {
        const testcases = [
          {
            code: 'auth/invalid-email',
            expectedErrorType: SignupErrorType.INVALID_EMAIL,
          },
          {
            code: 'auth/email-already-in-use',
            expectedErrorType: SignupErrorType.EMAIL_ALREADY_IN_USE,
          },
          {
            code: 'auth/operation-not-allowed',
            expectedErrorType: SignupErrorType.OPERATION_NOT_ALLOWED,
          },
          {
            code: 'auth/weak-password',
            expectedErrorType: SignupErrorType.WEAK_PASSWORD,
          },
          {
            code: 'unknown error code',
            expectedErrorType: SignupErrorType.UNKNOWN,
          },
        ];

        testcases.forEach((testcase) => {
          it(`should return ${testcase.code} registerFailed action`, () => {
            const err = new FirebaseError(testcase.code, 'some error message');
            spyOn(
              firebaseAuthMock,
              'createUserWithEmailAndPassword'
            ).and.callFake(() => {
              return throwError(() => err);
            });

            actions$ = hot('a', {
              a: {
                type: REGISTER_ACTION,
                email: 'some email',
                password: 'some password',
                username: 'some display name',
              },
            });
            const expected = cold('b', {
              b: {
                type: REGISTER_FAILED_ACTION,
                message: 'some error message',
                errorType: testcase.expectedErrorType,
              },
            });

            expect(effects.register$).toBeObservable(expected);
          });
        });
      });
    });

    describe('$updateDisplayName', () => {
      it('should be created', () => {
        expect(effects.updateDisplayName$).toBeTruthy();
      });

      it('should update displayName', () => {
        const user = new UserMock();
        const userCredential = new UserCredentialMock(user);
        actions$ = hot('a', {
          a: {
            type: UPDATE_DISPLAYNAME_ACTION,
            user: userCredential,
            displayName: 'some username',
          },
        });
        const expected = cold('b', {
          b: { type: UPDATE_DISPLAYNAME_SUCCESS_ACTION },
        });

        spyOn(user, 'updateProfile').and.callThrough();

        expect(effects.updateDisplayName$).toBeObservable(expected);
        expect(user.updateProfile).toHaveBeenCalled();
        expect(user.updateProfile).toHaveBeenCalledWith({
          displayName: 'some username',
        });
      });
    });
  });
});
