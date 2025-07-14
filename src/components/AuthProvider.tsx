'use client'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '@/app/store/slices/userSlice';
import { createClient } from '@/lib/supabase/client';

const AuthProvider = () => {
  const dispatch = useDispatch();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      console.log("Fetched user from Supabase:", user);

      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session?.user);


      if (session?.user) {
        dispatch(setUser(session.user));
      } else {
        dispatch(clearUser());
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
};

export default AuthProvider;
