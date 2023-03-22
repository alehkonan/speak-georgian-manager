import type { Verb } from '@/typings';
import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useWords } from '@/reactQuery/words';
import { SelectCell, TextCell } from '@/components/Cell';
import { mapWordToOption } from '@/utils';
import { useUpdateVerb } from '@/reactQuery/verb';
import { DeleteVerbButton } from './DeleteVerbButton';

const columnHelper = createColumnHelper<Verb>();

export const useColumns = () => {
  const { words } = useWords();
  const { updateVerb } = useUpdateVerb();

  const columns = useMemo(
    () => [
      columnHelper.accessor('original', {
        header: 'Original',
        cell: ({ getValue, row: { original } }) => (
          <TextCell
            value={getValue()}
            onChange={(value) =>
              updateVerb({ id: original.id, original: value })
            }
          />
        ),
      }),
      columnHelper.group({
        header: 'Past tense',
        columns: [
          columnHelper.accessor('past.firstPerson', {
            header: 'First person',
            cell: ({ getValue, row: { original } }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) =>
                  updateVerb({
                    id: original.id,
                    past: { firstPerson: Number(value) },
                  })
                }
              />
            ),
          }),
          columnHelper.accessor('past.secondPerson', {
            header: 'Second person',
            cell: ({ getValue, row: { original } }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) =>
                  updateVerb({
                    id: original.id,
                    past: { secondPerson: Number(value) },
                  })
                }
              />
            ),
          }),
          columnHelper.accessor('past.thirdPerson', {
            header: 'Third person',
            cell: ({ getValue, row: { original } }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) =>
                  updateVerb({
                    id: original.id,
                    past: { thirdPerson: Number(value) },
                  })
                }
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
            cell: ({ getValue, row: { original } }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) =>
                  updateVerb({
                    id: original.id,
                    present: { firstPerson: Number(value) },
                  })
                }
              />
            ),
          }),
          columnHelper.accessor('present.secondPerson', {
            header: 'Second person',
            cell: ({ getValue, row: { original } }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) =>
                  updateVerb({
                    id: original.id,
                    present: { secondPerson: Number(value) },
                  })
                }
              />
            ),
          }),
          columnHelper.accessor('present.thirdPerson', {
            header: 'Third person',
            cell: ({ getValue, row: { original } }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) =>
                  updateVerb({
                    id: original.id,
                    present: { thirdPerson: Number(value) },
                  })
                }
              />
            ),
          }),
        ],
      }),
      columnHelper.group({
        header: 'Future tense',
        columns: [
          columnHelper.accessor('future.firstPerson', {
            header: 'First person',
            cell: ({ getValue, row: { original } }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) =>
                  updateVerb({
                    id: original.id,
                    future: { firstPerson: Number(value) },
                  })
                }
              />
            ),
          }),
          columnHelper.accessor('future.secondPerson', {
            header: 'Second person',
            cell: ({ getValue, row: { original } }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) =>
                  updateVerb({
                    id: original.id,
                    future: { secondPerson: Number(value) },
                  })
                }
              />
            ),
          }),
          columnHelper.accessor('future.thirdPerson', {
            header: 'Third person',
            cell: ({ getValue, row: { original } }) => (
              <SelectCell
                value={getValue() || undefined}
                options={words?.map(mapWordToOption)}
                onChange={(value) =>
                  updateVerb({
                    id: original.id,
                    future: { thirdPerson: Number(value) },
                  })
                }
              />
            ),
          }),
        ],
      }),
      columnHelper.accessor('id', {
        header: () => null,
        cell: ({ getValue }) => <DeleteVerbButton verbId={getValue()} />,
      }),
    ],
    [updateVerb, words]
  );

  return columns;
};
