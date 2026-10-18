import axios from 'axios';
import { supabase } from './supabaseClient.js';

const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Only fallback to localhost:3001 when running locally. In production (e.g. Vercel), don't ping localhost
const API_BASE = import.meta.env.VITE_API_URL || (isLocalhost ? 'http://localhost:3001/api' : '');

export const httpClient = axios.create({
  baseURL: API_BASE || undefined,
  headers: { 'Content-Type': 'application/json' },
  timeout: 3000
});

// Attach Supabase auth token to every request
httpClient.interceptors.request.use(async (config) => {
  try {
    const { data } = await supabase.auth.getSession();
    if (data?.session?.access_token) {
      config.headers.Authorization = `Bearer ${data.session.access_token}`;
    }
  } catch {
    // offline/safe mode
  }
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default httpClient;
