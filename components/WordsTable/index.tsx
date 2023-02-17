import { useWords } from '@/reactQuery/words';
import { Col, Row, Table } from 'antd';
import { useColumns } from './useColumns';

export const WordsTable = () => {
  const { words, isLoading } = useWords();
  const columns = useColumns();

  return (
    <Row justify="center">
      <Col flex="0 0 1050px">
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={words}
          scroll={{ x: 1000 }}
          loading={isLoading}
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
