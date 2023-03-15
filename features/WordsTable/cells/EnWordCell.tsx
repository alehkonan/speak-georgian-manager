import { useWord } from '@/reactQuery/word';
import { Word } from '@/typings';
import { Typography, Spin, Space } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
  word: Word;
};

export const EnWordCell = ({ word }: Props) => {
  const [enWord, setEnWord] = useState(word.en);

  useEffect(() => setEnWord(word.en), [word]);

  const { updateWord, isUpdating } = useWord();

  return (
    <Space align="center">
      <Typography.Text
        editable={{
          text: word.en,
          onChange: (value) => {
            if (value === word.en) return;
            setEnWord(value);
            updateWord({ id: word.id, en: value });
          },
        }}
      >
        {enWord}
      </Typography.Text>
      <Spin size="small" spinning={isUpdating} />
    </Space>
  );
};
