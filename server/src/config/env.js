/**
 * @file env.js
 * Single place that reads and validates process.env for the backend.
 */
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};
