import type { Word } from '@/typings';
import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import {
  CategoryCell,
  EnWordCell,
  KaWordCell,
  PictureCell,
  TranscriptionCell,
} from './cells';
import { ActionCell } from './cells/ActionCell';

const columnHelper = createColumnHelper<Word>();

export const useColumns = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('en', {
        header: () => 'English word',
        cell: ({ row }) => <EnWordCell word={row.original} />,
      }),
      columnHelper.accessor('ka', {
        header: () => 'Georgian word',
        cell: ({ row }) => <KaWordCell word={row.original} />,
      }),
      columnHelper.accessor('transcription', {
        header: () => 'Transcription',
        cell: ({ row }) => <TranscriptionCell word={row.original} />,
      }),
      columnHelper.accessor('categoryId', {
        header: () => 'Category',
        cell: ({ row }) => <CategoryCell word={row.original} />,
      }),
      columnHelper.accessor('pictureUrl', {
        header: () => 'Picture',
        cell: ({ row }) => <PictureCell word={row.original} />,
      }),
      columnHelper.accessor('id', {
        header: () => null,
        cell: (ctx) => <ActionCell wordId={ctx.getValue()} />,
      }),
    ],
    []
  );

  return columns;
};
