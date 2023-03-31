import type { Word } from '@/typings';
import { useWords } from '@/reactQuery/words';
import { Table } from '@/components/Table';

import { useColumns } from './useColumns';
import { Col } from '@/components/Col';
import { Input } from '@/components/Input';

export const WordsTable = () => {
  const { words, isLoading } = useWords();
  const columns = useColumns();

  if (isLoading) return <p>Loading...</p>;
  if (!words) return <p>No words</p>;

  return (
    <Col>
      <Table<Word> data={words} columns={columns} hasSearch />
    </Col>
  );
};
