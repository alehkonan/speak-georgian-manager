import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useLogout = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => supabase.auth.signOut(),
    onSuccess: () => router.push('/login'),
  });

  return {
    logout: mutate,
    isLoading,
  };
};
