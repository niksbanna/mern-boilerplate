import authReducer, { clearError, setUser } from '../store/authSlice';
import { AuthState, User } from '../types';

describe('Auth Slice', () => {
  const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const previousState: AuthState = {
      ...initialState,
      error: 'Some error',
    };

    expect(authReducer(previousState, clearError())).toEqual({
      ...previousState,
      error: null,
    });
  });

  it('should handle setUser', () => {
    const user: User = {
      _id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(authReducer(initialState, setUser(user))).toEqual({
      ...initialState,
      user,
      isAuthenticated: true,
    });
  });
});
