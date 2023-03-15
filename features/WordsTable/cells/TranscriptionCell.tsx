import type { Word } from '@/typings';
import { useEffect, useState } from 'react';
import { useWord } from '@/reactQuery/word';

type Props = {
  word: Word;
};

export const TranscriptionCell = ({ word }: Props) => {
  const { updateWord } = useWord();
  const [transcription, setTranscription] = useState(word.transcription);

  useEffect(() => setTranscription(word.transcription), [word]);

  return (
    <div>
      <input
        type="text"
        value={transcription || ''}
        onChange={({ target }) => setTranscription(target.value)}
      />
      <button onClick={() => updateWord({ id: word.id, transcription })}>
        Change
      </button>
    </div>
  );
};
