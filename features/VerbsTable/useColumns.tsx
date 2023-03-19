import type { Verb } from '@/typings';
import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useWords } from '@/reactQuery/words';
import { SelectCell, TextCell } from '@/components/Cell';
import { mapWordToOption } from '@/utils';

const columnHelper = createColumnHelper<Verb>();

export const useColumns = () => {
  const { words } = useWords();

  const columns = useMemo(
    () => [
      columnHelper.accessor('original', {
        header: 'Original',
        cell: ({ getValue }) => (
          <TextCell
            value={getValue()}
            onChange={(value) => console.log(value)}
          />
        ),
      }),
      columnHelper.group({
        header: 'Past tense',
        columns: [
          columnHelper.accessor('past.firstPerson', {
            header: 'First person',
            cell: ({ getValue }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) => console.log(value)}
              />
            ),
          }),
          columnHelper.accessor('past.secondPerson', {
            header: 'Second person',
            cell: ({ getValue }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) => console.log(value)}
              />
            ),
          }),
          columnHelper.accessor('past.thirdPerson', {
            header: 'Third person',
            cell: ({ getValue }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) => console.log(value)}
              />
            ),
          }),
        ],
      }),
      columnHelper.group({
        header: 'Present tense',
        columns: [
          columnHelper.accessor('present.firstPerson', {
            header: 'First person',
            cell: ({ getValue }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) => console.log(value)}
              />
            ),
          }),
          columnHelper.accessor('present.secondPerson', {
            header: 'Second person',
            cell: ({ getValue }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) => console.log(value)}
              />
            ),
          }),
          columnHelper.accessor('present.thirdPerson', {
            header: 'Third person',
            cell: ({ getValue }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) => console.log(value)}
              />
            ),
          }),
        ],
      }),
      columnHelper.group({
        header: 'Past tense',
        columns: [
          columnHelper.accessor('future.firstPerson', {
            header: 'First person',
            cell: ({ getValue }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) => console.log(value)}
              />
            ),
          }),
          columnHelper.accessor('future.secondPerson', {
            header: 'Second person',
            cell: ({ getValue }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) => console.log(value)}
              />
            ),
          }),
          columnHelper.accessor('future.thirdPerson', {
            header: 'Third person',
            cell: ({ getValue }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) => console.log(value)}
              />
            ),
          }),
        ],
      }),
    ],
    [words]
  );

  return columns;
};
