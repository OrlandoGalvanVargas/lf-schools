import { AuthClient } from '@/sdk/clients';
import { authHelper } from './authHelper';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });

  failedQueue = [];
};

export const refreshToken = async () => {
  const refreshToken = authHelper.getRefreshToken();

  if (!refreshToken) {
    authHelper.clear();
    throw new Error('No refresh token');
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const response = await AuthClient.refresh({ refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    authHelper.login({
      accessToken,
      refreshToken: newRefreshToken,
    });

    processQueue(null, accessToken);

    return accessToken;
  } catch (error) {
    processQueue(error, null);
    authHelper.clear();
    throw error;
  } finally {
    isRefreshing = false;
  }
};
