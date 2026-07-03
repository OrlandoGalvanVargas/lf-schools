import { useAuth } from '@/auth';
import { withReactive } from '@/reactive';
import { LoginForm } from './LoginForm';
import { useOnResultReactor } from '@/reactive/hooks';

export const LoginController = withReactive(
  ({ services, monitors, onSuccess }) => {
    const { login } = useAuth();

    useOnResultReactor({
      login: {
        onSuccess: () => {
          login();
          onSuccess?.();
        },
      },
    });

    const handleDemo = () => {
      // Modo demo: entra directo sin pasar por el mock de autenticación
      login();
      onSuccess?.();
    };

    return <LoginForm onLogin={data => services.auth.login(data)} onDemo={handleDemo} />;
  },
  {
    init: () => {},
    queries: () => [],
    monitors: () => ['login'],
  },
);
