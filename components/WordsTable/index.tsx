import type { Category, Word } from '@/typings';
import { Table } from 'antd';
import { useColumns } from './useColumns';

type Props = {
  words: Word[];
  categories: Category[];
};

export const WordsTable = ({ words, categories }: Props) => {
  const columns = useColumns({ categories });

  return (
    <Table
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={words}
      scroll={{ x: 800 }}
    />
  );
};
