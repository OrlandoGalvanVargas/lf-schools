import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { requestInterceptor, responseInterceptor } from '@/sdk';
import './index.css';
import { AuthProvider } from '@/auth';
import { env } from '@/config/env';

if (!env.useMock) {
  requestInterceptor();
  responseInterceptor();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
