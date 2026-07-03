import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:7045',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
