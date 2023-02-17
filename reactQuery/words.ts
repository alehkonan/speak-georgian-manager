import type { Word } from '@/typings';
import { handleRequest } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './keys';

export const useWords = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.words,
    queryFn: ({ signal }) => handleRequest<Word[]>('/api/words', { signal }),
  });

  return {
    words: data,
    isLoading,
    error: error instanceof Error ? error : null,
  };
};
