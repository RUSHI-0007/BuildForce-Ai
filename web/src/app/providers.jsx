import React from 'react';
import { AuthProvider } from '../state/AuthContext';
import { AppProvider } from '../state/AppContext';

/**
 * Composed top-level context providers.
 */
export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </AuthProvider>
  );
}
