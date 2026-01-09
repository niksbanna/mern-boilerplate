import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import RoleBasedComponent from '../components/RoleBasedComponent';
import { User } from '../types';

const createMockStore = (user: User | null) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user,
        accessToken: user ? 'token' : null,
        isAuthenticated: !!user,
        isLoading: false,
        error: null,
      },
    },
  });
};

describe('RoleBasedComponent', () => {
  it('renders children for authorized role', () => {
    const user: User = {
      _id: '123',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const store = createMockStore(user);

    render(
      <Provider store={store}>
        <RoleBasedComponent roles={['admin']}>
          <div>Admin Content</div>
        </RoleBasedComponent>
      </Provider>
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  it('does not render children for unauthorized role', () => {
    const user: User = {
      _id: '123',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const store = createMockStore(user);

    render(
      <Provider store={store}>
        <RoleBasedComponent roles={['admin']}>
          <div>Admin Content</div>
        </RoleBasedComponent>
      </Provider>
    );

    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
  });

  it('renders fallback for unauthorized role', () => {
    const user: User = {
      _id: '123',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const store = createMockStore(user);

    render(
      <Provider store={store}>
        <RoleBasedComponent 
          roles={['admin']} 
          fallback={<div>Access Denied</div>}
        >
          <div>Admin Content</div>
        </RoleBasedComponent>
      </Provider>
    );

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
  });
});
