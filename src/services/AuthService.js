import { CreateService } from '@/reactive';
import { AuthClient } from '@/sdk/clients';
import { AlertService } from './AlertService';
import { authHelper } from '../sdk/authHelper';

export const authReactor = {
  onSuccess: ({ action, payload }) => {
    const { accessToken, refreshToken } = payload;

    switch (action) {
      case 'login':
        authHelper.login({ accessToken, refreshToken });
        break;
      case 'logout':
        authHelper.clear();
        break;
    }
  },
  onError: ({ action, error }) => {
    switch (action) {
      case 'login':
        AlertService.error(error.data);
        break;
      case 'logout':
        AlertService.error('Expired session');
        break;
    }
  },
};

export const AuthService = CreateService(AuthClient, authReactor);
