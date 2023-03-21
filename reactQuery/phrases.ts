import type { Phrase } from '@/typings';
import { handleRequest } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './keys';

export const usePhrases = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.phrases,
    queryFn: ({ signal }) =>
      handleRequest<Phrase[]>('/api/phrases', { signal }),
  });

  return {
    phrases: data,
    isLoading,
  };
};
