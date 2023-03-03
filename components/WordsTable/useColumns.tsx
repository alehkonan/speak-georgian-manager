import type { Word } from '@/typings';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import {
  CategoryCell,
  EnWordCell,
  KaWordCell,
  PictureCell,
  TranscriptionCell,
} from './cells';
import { ActionCell } from './cells/ActionCell';

export const useColumns = () => {
  const columns = useMemo<ColumnsType<Word>>(
    () => [
      {
        title: 'English word',
        dataIndex: 'en',
        width: 200,
        sorter: (a, b) => a.en.toLowerCase().localeCompare(b.en.toLowerCase()),
        showSorterTooltip: false,
        render: (_, word) => <EnWordCell word={word} />,
      },
      {
        title: 'Georgian word',
        dataIndex: 'ka',
        width: 200,
        sorter: (a, b) => a.ka.toLowerCase().localeCompare(b.ka.toLowerCase()),
        showSorterTooltip: false,
        render: (_, word) => <KaWordCell word={word} />,
      },
      {
        title: 'Transcription',
        dataIndex: 'transcription',
        width: 200,
        render: (_, word) => <TranscriptionCell word={word} />,
      },
      {
        title: 'Category',
        dataIndex: 'categoryId',
        width: 200,
        render: (_, word) => <CategoryCell word={word} />,
      },
      {
        title: 'Picture',
        dataIndex: 'pictureUrl',
        width: 150,
        render: (_, word) => <PictureCell word={word} />,
      },
      {
        width: 50,
        render: (_, word) => <ActionCell wordId={word.id} />,
      },
    ],
    []
  );

  return columns;
};
