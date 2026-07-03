import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth';

export const ProtectedRoute = () => {
  const { isLogged, isInitializing } = useAuth();

  if (isInitializing) {
    return null;
  }

  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
