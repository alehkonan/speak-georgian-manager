import { useWords } from '@/reactQuery/words';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useColumns } from './useColumns';
import styles from './styles.module.css';

export const WordsTable = () => {
  const { words } = useWords();
  const columns = useColumns();

  const table = useReactTable({
    data: words || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={styles.row}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.cell}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.row}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
