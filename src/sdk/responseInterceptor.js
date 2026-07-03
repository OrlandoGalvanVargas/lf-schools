import { api } from './api';
import { refreshToken } from './refreshManager';

export const responseInterceptor = () => {
  api.interceptors.response.use(
    response => response,

    async error => {
      const originalRequest = error.config;

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    },
  );
};

export default responseInterceptor;
