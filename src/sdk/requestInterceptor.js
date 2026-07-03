import { api } from './api';
import { authHelper } from './authHelper';
import { refreshToken } from './refreshManager';

export const requestInterceptor = () => {
  api.interceptors.request.use(async config => {
    let accessToken = authHelper.getAccessToken();

    if (authHelper.isTokenExpired(accessToken)) {
      try {
        accessToken = await refreshToken();
      } catch (error) {
        throw error;
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });
};

export default requestInterceptor;
