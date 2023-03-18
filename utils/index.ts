import type { SelectOption } from '@/components/Select';
import type { Category, Response } from '@/typings';

export const handleRequest = async <Data extends unknown>(
  url: RequestInfo | URL,
  requestInit?: RequestInit
) => {
  const response = await fetch(url, requestInit);

  switch (response.status) {
    case 204:
    case 304:
      return undefined;

    case 500:
      throw new Error('Server Error');

    default:
      const data: Response<Data> = await response.json();
      if (!response.ok) throw new Error(data.errorMessage);
      return data.data;
  }
};

export const mapCategoryToOption = (category: Category): SelectOption => ({
  value: category.id,
  label: category.name,
});
