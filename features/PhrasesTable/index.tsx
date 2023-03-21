import { Table } from '@/components/Table';

import { useColumns } from './useColumns';
import { usePhrases } from '@/reactQuery/phrases';

export const PhrasesTable = () => {
  const { phrases, isLoading } = usePhrases();
  const columns = useColumns();

  if (isLoading) return <p>Loading...</p>;
  if (!phrases) return <p>No phrases</p>;

  return <Table data={phrases} columns={columns} />;
};
