import { UserModel } from '../models/user.model';
import { addError, authStateChanged } from './auth.actions';
import { AuthState, State, authReducer } from './auth.reducer';

describe('AuthReducer', () => {
  describe('Unknown action', () => {
    it('should return the current state', () => {
      const initialState: State = { authState: AuthState.NOT_SET, user: null };
      const action = { type: 'Unknown Action' };
      const state = authReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('authStateChanged action', () => {
    it('should set user', () => {
      const user = {} as UserModel;
      const initialState: State = {
        authState: AuthState.NOT_SET,
        user: null,
      };
      const action = authStateChanged({ user });

      const state = authReducer(initialState, action);

      expect(state.user).toBe(user);
    });

    describe('authStates', () => {
      const testcases = [
        { user: {} as UserModel, expected: AuthState.LOGGED_IN },
        { user: null, expected: AuthState.LOGGED_OUT },
      ];

      testcases.forEach((testcase) => {
        it(`should set authState = ${testcase.expected} if user = ${testcase.user}`, () => {
          const user = testcase.user;
          const initialState: State = {
            authState: AuthState.NOT_SET,
            user: null,
          };
          const action = authStateChanged({ user });

          const state = authReducer(initialState, action);

          expect(state.authState).toBe(testcase.expected);
        });
      });
    });
  });

  describe('addError action', () => {
    it('should set error message', () => {
      const initialState: State = {
        authState: AuthState.NOT_SET,
        user: null,
      };
      const action = addError({ message: 'some error message' });

      const state = authReducer(initialState, action);

      expect(state.errorMessage).toBe('some error message');
    });
  });
});
