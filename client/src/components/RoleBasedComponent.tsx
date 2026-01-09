import React from 'react';
import { useAppSelector } from '../hooks/redux';

interface RoleBasedComponentProps {
  roles: Array<'user' | 'admin' | 'moderator'>;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  roles,
  children,
  fallback = null,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user || !roles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleBasedComponent;
