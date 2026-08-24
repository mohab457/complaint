import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email , setEmail] = useState('')
  const [isloading, setIsLoading] = useState(true);

  async function fetchUserData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        setEmail(user.email || '');
        const { data, error } = await supabase
          .from('register')
          .select('userName, phone')
          .eq('id', user.id);

        if (data && data.length > 0 && !error) {
          setUserName(data[0].userName);
          setPhone(data[0].phone);
        } else {
          setUserName(user.user_metadata?.userName || user.email);
          setPhone(user.user_metadata?.phone || 'No phone found');
        }
      } else {
        setUser(null);
        setUserName('');
        setPhone('');
        setEmail('');
      }
    } catch (err) {
      console.error('Error fetching user context:', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        fetchUserData();
      } else {
        setUser(null);
        setUserName('');
        setPhone('');
        setEmail('');
        setIsLoading(false);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userName, phone, email, isloading, refreshUserData: fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}