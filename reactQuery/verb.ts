import type { DeepPartial, Verb } from '@/typings';
import { handleRequest } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import deepmerge from 'deepmerge';
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

export const useUpdateVerb = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, ...verb }: DeepPartial<Verb>) => {
      return handleRequest(`/api/verb/${id}`, {
        method: 'PUT',
        body: JSON.stringify(verb),
      });
    },
    onSuccess: (_, newVerb) => {
      queryClient.setQueryData<Verb[]>(queryKeys.verbs, (verbs) =>
        verbs?.map((verb) => {
          const mergedVerb = deepmerge(verb, newVerb) as Verb;
          return verb.id === newVerb.id ? mergedVerb : verb;
        })
      );
    },
  });

  return {
    updateVerb: mutate,
    isUpdating: isLoading,
  };
};

export const useDeleteVerb = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id: Verb['id']) => {
      return handleRequest(`/api/verb/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Verb[]>(queryKeys.verbs, (verbs) =>
        verbs?.filter((verb) => verb.id !== deletedId)
      );
    },
  });

  return {
    deleteVerb: mutate,
    isDeleting: isLoading,
  };
};
