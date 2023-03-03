import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useWord } from '@/reactQuery/word';

type Props = {
  wordId: number;
};

export const ActionCell = ({ wordId }: Props) => {
  const { deleteWord, isDeleting } = useWord();

  return (
    <Popconfirm
      title="Delete this word?"
      okText="Yes"
      cancelText="No"
      placement="left"
      onConfirm={() => deleteWord(wordId)}
      okButtonProps={{ loading: isDeleting }}
    >
      <Button
        type="text"
        danger
        title="Delete word"
        shape="circle"
        icon={<DeleteOutlined />}
      />
    </Popconfirm>
  );
};
