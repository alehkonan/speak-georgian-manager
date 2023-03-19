import type { Verb } from '@/typings';
import { Table } from '@/components/Table';
import { useVerbs } from '@/reactQuery/verbs';
import { useColumns } from './useColumns';

export const VerbsTable = () => {
  const { verbs, isLoading } = useVerbs();
  const columns = useColumns();

  if (isLoading) return <p>Loading...</p>;
  if (!verbs) return <p>No verbs</p>;

  return <Table<Verb> data={verbs} columns={columns} />;
};
