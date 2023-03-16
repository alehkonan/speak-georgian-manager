import type { Word } from '@/typings';
import { useEffect, useState } from 'react';
import { useWord } from '@/reactQuery/word';
import { Button } from '@/components/Button';

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
      <Button onClick={() => updateWord({ id: word.id, ka: kaWord })}>
        Change
      </Button>
    </div>
  );
};
