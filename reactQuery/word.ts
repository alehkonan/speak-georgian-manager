import type { Word } from '@/typings';
import { handleRequest } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './keys';

export const useWord = () => {
  const queryClient = useQueryClient();

  const { mutate: updateWord, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, ...word }: Partial<Word>) => {
      return handleRequest(`/api/word/${id}`, {
        method: 'PUT',
        body: JSON.stringify(word),
      });
    },
    onSuccess: (_, newWord) => {
      queryClient.setQueryData<Word[]>(queryKeys.words, (words) =>
        words?.map((word) =>
          word.id === newWord.id ? { ...word, ...newWord } : word
        )
      );
    },
  });

  const { mutate: deleteWord, isLoading: isDeleting } = useMutation({
    mutationFn: (wordId: Word['id']) => {
      return handleRequest(`/api/word/${wordId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: (_, wordId) => {
      queryClient.setQueryData<Word[]>(queryKeys.words, (words) =>
        words?.filter((word) => word.id !== wordId)
      );
    },
  });

  return {
    updateWord,
    deleteWord,
    isUpdating,
    isDeleting,
  };
};

export const useAddWord = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (word: Omit<Word, 'id'>) => {
      const data = await handleRequest<Word[]>('api/words', {
        method: 'POST',
        body: JSON.stringify(word),
      });
      return data;
    },
    onSuccess: (createdWords) => {
      queryClient.setQueryData<Word[]>(
        queryKeys.words,
        (words) => words && createdWords && [...words, ...createdWords]
      );
    },
  });

  return {
    addWord: mutate,
    isAdding: isLoading,
  };
};
