import type { Word } from '@/typings';
import { handleRequest } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './keys';

export const useWords = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.words,
    queryFn: ({ signal }) => handleRequest<Word[]>('/api/words', { signal }),
  });

  return {
    words: data,
    isLoading,
  };
};
