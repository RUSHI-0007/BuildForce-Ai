import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../api/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [org, setOrg] = useState({
    id: 'org_primary_01',
    name: 'Omkar Infra & Builders',
    owner: 'Omkar Patil',
    plan: 'Starter Pro'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check local saved session first
    const savedUser = localStorage.getItem('buildsite_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    } else {
      // Default to contractor so user can immediately experience the portal without confusion
      const defaultContractor = {
        id: 'user_omkar_01',
        name: 'Omkar Patil',
        email: 'omkar@omkarinfra.com',
        role: 'Contractor / Owner',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      };
      setUser(defaultContractor);
      localStorage.setItem('buildsite_user', JSON.stringify(defaultContractor));
    }

    // 2. Listen to Supabase auth changes if client is configured
    try {
      if (supabase && supabase.auth) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            const sbUser = {
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email,
              avatar: session.user.user_metadata?.avatar_url,
              role: 'Contractor / Owner'
            };
            setUser(sbUser);
            localStorage.setItem('buildsite_user', JSON.stringify(sbUser));
          }
          setLoading(false);
        }).catch(() => setLoading(false));

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            const sbUser = {
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email,
              avatar: session.user.user_metadata?.avatar_url,
              role: 'Contractor / Owner'
            };
            setUser(sbUser);
            localStorage.setItem('buildsite_user', JSON.stringify(sbUser));
          }
        });

        return () => subscription?.unsubscribe();
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      if (!supabase?.auth) {
        throw new Error('Supabase client not configured. Check .env variables.');
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      console.warn('Google sign-in fell back:', err.message);
      const quickUser = {
        id: 'user_omkar_01',
        name: 'Omkar Patil',
        email: 'omkar@omkarinfra.com',
        role: 'Contractor / Owner'
      };
      setUser(quickUser);
      localStorage.setItem('buildsite_user', JSON.stringify(quickUser));
    }
  };

  const loginAsContractor = (contractorData) => {
    const newUser = {
      id: 'usr_' + Date.now(),
      name: contractorData?.name || 'Omkar Patil',
      email: contractorData?.email || 'omkar@infra.in',
      company: contractorData?.company || 'Omkar Infra & Builders',
      role: 'Contractor / Owner'
    };
    setUser(newUser);
    if (contractorData?.company) {
      setOrg(prev => ({ ...prev, name: contractorData.company }));
    }
    localStorage.setItem('buildsite_user', JSON.stringify(newUser));
  };

  const signOut = async () => {
    try {
      if (supabase?.auth) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    localStorage.removeItem('buildsite_user');
  };

  return (
    <AuthContext.Provider value={{ user, org, setOrg, loading, signInWithGoogle, loginAsContractor, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
