import { Category } from '@/typings';
import { handleRequest } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './keys';

export const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.categories,
    queryFn: ({ signal }) =>
      handleRequest<Category[]>('/api/categories', { signal }),
  });

  return {
    categories: data,
    isLoading,
    error: error instanceof Error ? error : null,
  };
};
