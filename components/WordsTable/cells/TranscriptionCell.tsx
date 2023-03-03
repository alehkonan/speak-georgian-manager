import { useWord } from '@/reactQuery/word';
import { Word } from '@/typings';
import { Typography, Spin, Space } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
  word: Word;
};

export const TranscriptionCell = ({ word }: Props) => {
  const [transcription, setTranscription] = useState(word.transcription);

  useEffect(() => setTranscription(word.transcription), [word]);

  const { updateWord, isUpdating } = useWord();

  return (
    <Space align="center">
      <Typography.Text
        editable={{
          text: word.transcription || undefined,
          onChange: (value) => {
            if (value === word.transcription) return;
            setTranscription(value);
            updateWord({ id: word.id, transcription: value });
          },
        }}
      >
        {transcription}
      </Typography.Text>
      <Spin size="small" spinning={isUpdating} />
    </Space>
  );
};
