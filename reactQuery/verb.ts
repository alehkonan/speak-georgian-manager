import type { Verb } from '@/typings';
import { handleRequest } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './keys';

export const useAddVerb = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (verb: Omit<Verb, 'id'>) => {
      const data = await handleRequest<Verb[]>('api/verbs', {
        method: 'POST',
        body: JSON.stringify(verb),
      });
      return data;
    },
    onSuccess: (createdVerbs) => {
      queryClient.setQueryData<Verb[]>(
        queryKeys.verbs,
        (verbs) => verbs && createdVerbs && [...verbs, ...createdVerbs]
      );
    },
  });

  return {
    addVerb: mutate,
    isAdding: isLoading,
  };
};
