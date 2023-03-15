import type { Word } from '@/typings';
import { useEffect, useState } from 'react';
import { useWord } from '@/reactQuery/word';

type Props = {
  word: Word;
};

export const KaWordCell = ({ word }: Props) => {
  const { updateWord } = useWord();
  const [kaWord, setKaWord] = useState(word.ka);

  useEffect(() => setKaWord(word.ka), [word]);

  return (
    <div>
      <input
        type="text"
        value={kaWord}
        onChange={({ target }) => setKaWord(target.value)}
      />
      <button onClick={() => updateWord({ id: word.id, ka: kaWord })}>
        Change
      </button>
    </div>
  );
};
