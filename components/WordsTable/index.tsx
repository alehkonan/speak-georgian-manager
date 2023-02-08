import type { Category, Word } from '@/typings';
import { Col, Row, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { handleRequest } from '@/utils';
import { useColumns } from './useColumns';

export const WordsTable = () => {
  const { data: words, isLoading: isLoadingWords } = useQuery({
    queryKey: ['words'],
    queryFn: ({ signal }) => handleRequest<Word[]>('/api/words', { signal }),
  });
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: ({ signal }) =>
      handleRequest<Category[]>('/api/categories', { signal }),
  });
  const columns = useColumns({ categories });

  return (
    <Row justify="center">
      <Col flex="0 0 1050px">
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={words}
          scroll={{ x: 1000 }}
          loading={isLoadingWords || isLoadingCategories}
          rowSelection={{
            type: 'checkbox',
          }}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 10,
            showLessItems: true,
            showSizeChanger: false,
          }}
        />
      </Col>
    </Row>
  );
};
