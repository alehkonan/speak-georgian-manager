import type { Word } from '@/typings';
import { useEffect, useState } from 'react';
import { useWord } from '@/reactQuery/word';

type Props = {
  word: Word;
};

export const EnWordCell = ({ word }: Props) => {
  const { updateWord } = useWord();
  const [enWord, setEnWord] = useState(word.en);

  useEffect(() => setEnWord(word.en), [word]);

  return (
    <div>
      <input
        type="text"
        value={enWord}
        onChange={({ target }) => setEnWord(target.value)}
      />
      <button onClick={() => updateWord({ id: word.id, en: enWord })}>
        Change
      </button>
    </div>
  );
};
