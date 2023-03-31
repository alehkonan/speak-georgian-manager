import type { Word } from '@/typings';
import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { SelectCell, TextCell } from '@/components/Cell';
import { useWord } from '@/reactQuery/word';
import { useCategories } from '@/reactQuery/categories';
import { DeleteWordButton } from './DeleteWordButton';
import { mapCategoryToOption } from '@/utils';

const columnHelper = createColumnHelper<Word>();

export const useColumns = () => {
  const { updateWord } = useWord();
  const { categories } = useCategories();

  const columns = useMemo(
    () => [
      columnHelper.accessor('en', {
        header: () => 'English word',
        cell: ({ getValue, row: { original } }) => (
          <TextCell
            value={getValue()}
            onChange={(value) => updateWord({ id: original.id, en: value })}
          />
        ),
      }),
      columnHelper.accessor('ka', {
        header: () => 'Georgian word',
        cell: ({ getValue, row: { original } }) => (
          <TextCell
            value={getValue()}
            onChange={(value) => updateWord({ id: original.id, ka: value })}
          />
        ),
      }),
      columnHelper.accessor('transcription', {
        enableGlobalFilter: false,
        header: () => 'Transcription',
        cell: ({ getValue, row: { original } }) => (
          <TextCell
            value={getValue() || ''}
            onChange={(value) =>
              updateWord({ id: original.id, transcription: value || null })
            }
          />
        ),
      }),
      columnHelper.accessor('categoryId', {
        enableGlobalFilter: false,
        header: () => 'Category',
        cell: ({ getValue, row: { original } }) => (
          <SelectCell
            value={getValue() || undefined}
            options={categories?.map(mapCategoryToOption)}
            onChange={(value) =>
              updateWord({ id: original.id, categoryId: Number(value) })
            }
          />
        ),
      }),
      columnHelper.accessor('id', {
        enableGlobalFilter: false,
        header: () => null,
        cell: ({ getValue }) => <DeleteWordButton wordId={getValue()} />,
      }),
    ],
    [categories, updateWord]
  );

  return columns;
};
