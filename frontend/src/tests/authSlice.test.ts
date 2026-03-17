import authReducer, { login, logout } from '../redux/authSlice';

describe('authSlice Reducer', () => {
  const initialState = { user: null };

  test('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({ user: null });
  });

  test('should set user on login', () => {
    const user = { _id: '1', name: 'Adrian', email: 'adrian@test.com' };
    const state = authReducer(initialState, login(user));
    expect(state.user).toEqual(user);
  });

  test('should clear user on logout', () => {
    const loggedInState = {
      user: { _id: '1', name: 'Adrian', email: 'adrian@test.com' },
    };
    const state = authReducer(loggedInState, logout());
    expect(state.user).toBeNull();
  });

  test('should handle login after logout', () => {
    const user = { _id: '2', name: 'John', email: 'john@test.com' };
    let state = authReducer(initialState, login(user));
    state = authReducer(state, logout());
    expect(state.user).toBeNull();
    state = authReducer(state, login(user));
    expect(state.user).toEqual(user);
  });

  test('should overwrite user on re-login', () => {
    const user1 = { _id: '1', name: 'Adrian', email: 'adrian@test.com' };
    const user2 = { _id: '2', name: 'John', email: 'john@test.com' };
    let state = authReducer(initialState, login(user1));
    state = authReducer(state, login(user2));
    expect(state.user).toEqual(user2);
  });
});
