import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/auth';
import { RoutePaths } from '@/features/routing';
import { LoginController } from './LoginController';

export const LoginView = () => {
  const navigate = useNavigate();
  const { isLogged } = useAuth();
  if (isLogged) {
    return <Navigate to="/home" replace />;
  }
  return <LoginController onSuccess={() => navigate('/home')} />;
};
