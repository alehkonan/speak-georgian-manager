import type { Category } from '@/typings';
import { handleRequest } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { queryKeys } from './keys';

export const useCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.categories,
    queryFn: ({ signal }) =>
      handleRequest<Category[]>('/api/categories', { signal }),
  });

  return {
    categories: data,
    isLoading,
  };
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (category: Omit<Category, 'id'>) => {
      const data = await handleRequest<Category[]>('api/categories', {
        method: 'POST',
        body: JSON.stringify(category),
      });
      return data;
    },
    onSuccess: (createdCategories) => {
      queryClient.setQueryData<Category[]>(
        queryKeys.categories,
        (categories) =>
          categories &&
          createdCategories && [...categories, ...createdCategories]
      );
      message.success('Category has been added');
    },
  });

  return {
    addCategory: mutate,
    isAddingCategory: isLoading,
  };
};
