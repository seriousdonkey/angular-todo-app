import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthFacade } from './auth.facade';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { LOGIN_ACTION, LOGOUT_ACTION, REGISTER_ACTION } from '../auth.actions';
import { AuthState } from '../auth.reducer';
import { UserModel } from '../../core/models/user.model';

describe('AuthFacade', () => {
  let facade: AuthFacade;
  let store: MockStore;

  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthFacade, provideMockStore({ initialState })],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(AuthFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should create the mockstore', () => {
    expect(store).toBeTruthy();
  });

  it('should dispatch login action', () => {
    const expected = cold('a', {
      a: { type: LOGIN_ACTION, email: 'some email', password: 'some password' },
    });

    facade.login('some email', 'some password');

    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch register action', () => {
    const expected = cold('a', {
      a: {
        type: REGISTER_ACTION,
        email: 'some email',
        password: 'some password',
        username: 'some username',
      },
    });

    facade.register('some email', 'some password', 'some username');

    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch logout action', () => {
    const expected = cold('a', {
      a: { type: LOGOUT_ACTION },
    });

    facade.logout();

    expect(store.scannedActions$).toBeObservable(expected);
  });

  describe('authState$', () => {
    const expectedAuthStates = [
      AuthState.LOGGED_IN,
      AuthState.LOGGED_OUT,
      AuthState.NOT_SET,
    ];

    expectedAuthStates.forEach((authState) => {
      it(`should return ${authState}`, () => {
        const expected = cold('a', {
          a: authState,
        });

        store.setState({ auth: { authState: authState } });

        expect(facade.authState$).toBeObservable(expected);
      });
    });
  });

  describe('isAuth$', () => {
    const testcases = [
      { user: null, expected: false },
      { user: {} as UserModel, expected: true },
    ];
    testcases.forEach((testcase) => {
      it(`should return ${testcase.expected} if user = ${testcase.user}`, () => {
        const expected = cold('a', {
          a: testcase.expected,
        });

        store.setState({ auth: { user: testcase.user } });

        expect(facade.isAuth$).toBeObservable(expected);
      });
    });
  });

  describe('user$', () => {
    const user = {} as UserModel;
    const testcases = [
      { user: null, expected: null },
      { user: user, expected: user },
    ];

    testcases.forEach((testcase) => {
      it(`should return ${testcase.expected} if user = ${testcase.user}`, () => {
        const expected = cold('a', {
          a: testcase.expected,
        });

        store.setState({ auth: { user: testcase.user } });

        expect(facade.user$).toBeObservable(expected);
      });
    });
  });

  describe('errorMessage$', () => {
    it('should return error message', () => {
      const expected = cold('a', {
        a: 'some error message',
      });

      store.setState({ auth: { errorMessage: 'some error message' } });

      expect(facade.errorMessage$).toBeObservable(expected);
    });
  });
});
