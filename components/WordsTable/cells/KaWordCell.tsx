import { useWord } from '@/reactQuery/word';
import { Word } from '@/typings';
import { Typography, Spin, Space } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
  word: Word;
};

export const KaWordCell = ({ word }: Props) => {
  const [kaWord, setKaWord] = useState(word.ka);

  useEffect(() => setKaWord(word.ka), [word]);

  const { updateWord, isUpdating } = useWord();

  return (
    <Space align="center">
      <Typography.Text
        editable={{
          text: word.ka,
          onChange: (value) => {
            if (value === word.ka) return;
            setKaWord(value);
            updateWord({ id: word.id, ka: value });
          },
        }}
      >
        {kaWord}
      </Typography.Text>
      <Spin size="small" spinning={isUpdating} />
    </Space>
  );
};
