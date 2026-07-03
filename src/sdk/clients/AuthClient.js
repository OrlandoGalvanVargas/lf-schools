import { env } from '@/config/env';

const mockLogin = {
  Email: 'admin',
  Password: '123',
};

const mockToken = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
};

const LoginMock = async data => {
  if (data.email === mockLogin.Email && data.password === mockLogin.Password) {
    return {
      data: mockToken,
    };
  }

  throw {
    status: 401,
    data: {
      message: 'Invalid Email',
    },
  };
};

const request = async (url, options = {}) => {
  const response = await fetch(`https://localhost:7045${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    };
  }

  return {
    data,
  };
};

export const AuthClient = {
  login: data =>
    !env.useMock
      ? LoginMock(data)
      : request('/auth/login', {
          method: 'POST',
          body: JSON.stringify(data),
        }),

  logout: data =>
    request('/auth/logout', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  refresh: data =>
    request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
