import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const supabaseClient = useSupabaseClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      }),
  });

  return {
    loginWithGoogle: mutate,
    isLoading,
  };
};
