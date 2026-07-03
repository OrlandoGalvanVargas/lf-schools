import { useEffect, useState } from 'react';
import { authHelper, refreshToken } from '@/sdk';
import { AuthContext } from './AuthContext';
import { env } from '@/config/env';

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isInitializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeLoggin = async () => {
      const accessToken = authHelper.getAccessToken();

      if (!accessToken) {
        setInitializing(false);
        return;
      }

      if (env.useMock) {
        setIsLogged(true);
        setInitializing(false);
        return;
      }

      if (!authHelper.isTokenExpired(accessToken)) {
        setIsLogged(true);
        setInitializing(false);
        return;
      }

      try {
        const response = await refreshToken();
        setIsLogged(true);
      } catch (error) {
        setIsLogged(false);
        throw error;
      } finally {
        setInitializing(false);
      }
    };
    initializeLoggin();
  }, []);

  const login = () => {
    setIsLogged(true);
  };

  const logout = () => {
    authHelper.logout();
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, isInitializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
