import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthEffects } from './auth.effects';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { TodoComponent } from 'src/app/pages/todo/todo.component';

class AngularFireAuthMock {
  private readonly user: unknown | null;

  constructor(user: unknown | null) {
    this.user = user;
  }

  public get authState(): Observable<unknown | null> {
    return of(this.user);
  }
}

describe('AuthEffects', () => {
  let effects: AuthEffects;

  describe('authState$', () => {
    const user = {
      uid: 'some id',
      email: 'some email',
      displayName: 'some display name',
    };
    const firebaseAuthMock = new AngularFireAuthMock(user);

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'todo', component: TodoComponent },
          ]),
        ],
        providers: [
          AuthEffects,
          { provide: AngularFireAuth, useValue: firebaseAuthMock },
        ],
      });

      effects = TestBed.inject(AuthEffects);
    });

    it('should be created', () => {
      expect(effects.authState$).toBeTruthy();
    });

    // TODO: fix tests

    // it('should return authChanged action with user', () => {
    //   const expected = cold('a', {
    //     a: {
    //       type: AUTH_STATE_CHANGED_ACTION,
    //       user: {
    //         userId: 'some id',
    //         email: 'some email',
    //         displayName: 'some display name',
    //       } as UserModel,
    //     },
    //   });

    //   expect(effects.authState$).toBeObservable(expected);
    // });
  });
});
