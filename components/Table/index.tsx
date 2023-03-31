import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Button } from '../Button';
import { Col } from '../Col';
import { Search } from '../Search';
import styles from './styles.module.css';

type Props<Row extends object> = {
  data: Row[];
  columns: ColumnDef<Row, any>[];
  hasSearch?: boolean;
};

export const Table = <Row extends object>({
  data,
  columns,
  hasSearch,
}: Props<Row>) => {
  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    previousPage,
    getCanNextPage,
    nextPage,
    getPageOptions,
    setPageIndex,
    getState,
    setGlobalFilter,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Col>
      {hasSearch && <Search onSearch={setGlobalFilter} />}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.row}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={styles.headerCell}
                  >
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
            {getRowModel().rows.map((row) => (
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
      <div className={styles.pagination}>
        <Button disabled={!getCanPreviousPage()} onClick={previousPage}>
          Prev
        </Button>
        {getPageOptions().map((pageIndex) => (
          <Button
            key={pageIndex}
            disabled={getState().pagination.pageIndex === pageIndex}
            onClick={() => setPageIndex(pageIndex)}
          >
            {pageIndex + 1}
          </Button>
        ))}
        <Button disabled={!getCanNextPage()} onClick={nextPage}>
          Next
        </Button>
      </div>
    </Col>
  );
};
