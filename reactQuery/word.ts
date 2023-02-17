import type { Word } from '@/typings';
import { handleRequest } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './keys';

export const useWord = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, ...word }: Partial<Word>) =>
      handleRequest(`/api/word/${id}`, {
        method: 'PUT',
        body: JSON.stringify(word),
      }),
    onSuccess: (_, newWord) =>
      queryClient.setQueryData<Word[]>(queryKeys.words, (words) =>
        words?.map((word) =>
          word.id === newWord.id ? { ...word, ...newWord } : word
        )
      ),
  });

  return {
    update: mutate,
    isUpdating: isLoading,
  };
};
