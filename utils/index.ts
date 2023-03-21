import type { SelectOption } from '@/components/Select';
import type { Category, Response, Word } from '@/typings';

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
      const data = (await response.json()) as Response<Data>;
      if (!response.ok) throw new Error(data.errorMessage);
      return data.data;
  }
};

export const mapCategoryToOption = (category: Category): SelectOption => ({
  value: category.id,
  label: category.name,
});

export const mapWordToOption = (word: Word): SelectOption => ({
  value: word.id,
  label: word.en,
});

type Input<T extends object> = {
  [Key in keyof T]: T[Key];
};

export const entries = <T extends object>(object: T) =>
  Object.entries<T[keyof T]>(object as Input<T>) as [
    key: keyof T,
    value: T[keyof T]
  ][];
