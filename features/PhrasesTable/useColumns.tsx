import type { Phrase } from '@/typings';
import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { SelectCell, TextCell } from '@/components/Cell';
import { useCategories } from '@/reactQuery/categories';
import { mapCategoryToOption } from '@/utils';

const columnHelper = createColumnHelper<Phrase>();

export const useColumns = () => {
  const { categories } = useCategories();

  const columns = useMemo(
    () => [
      columnHelper.accessor('en', {
        header: () => 'English',
        cell: ({ getValue, row: { original } }) => (
          <TextCell
            value={getValue()}
            onChange={(value) => console.log(value)} // TODO add change handling
          />
        ),
      }),
      columnHelper.accessor('ka', {
        header: () => 'Georgian',
        cell: ({ getValue, row: { original } }) => (
          <TextCell
            value={getValue()}
            onChange={(value) => console.log(value)} // TODO add change handling
          />
        ),
      }),
      columnHelper.accessor('transcription', {
        header: () => 'Transcription',
        cell: ({ getValue, row: { original } }) => (
          <TextCell
            value={getValue() || ''}
            onChange={(value) => console.log(value)} // TODO add change handling
          />
        ),
      }),
      columnHelper.accessor('categoryId', {
        header: () => 'Category',
        cell: ({ getValue, row: { original } }) => (
          <SelectCell
            value={getValue() || undefined}
            options={categories?.map(mapCategoryToOption)}
            onChange={(value) => console.log(value)} // TODO add change handling
          />
        ),
      }),
    ],
    [categories]
  );

  return columns;
};
