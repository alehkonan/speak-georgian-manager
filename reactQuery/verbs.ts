import type { Verb } from '@/typings';
import { handleRequest } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './keys';

export const useVerbs = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.verbs,
    queryFn: ({ signal }) => handleRequest<Verb[]>('/api/verbs', { signal }),
  });

  return {
    verbs: data,
    isLoading,
  };
};
