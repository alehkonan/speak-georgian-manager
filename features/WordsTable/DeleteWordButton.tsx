import { TrashIcon } from '@primer/octicons-react';
import { Button } from '@/components/Button';
import { useWord } from '@/reactQuery/word';

type Props = {
  wordId: number;
};

export const DeleteWordButton = ({ wordId }: Props) => {
  const { deleteWord, isDeleting } = useWord();

  if (isDeleting) return <span>Loading...</span>;

  return (
    <Button title="Delete" onClick={() => deleteWord(wordId)}>
      <TrashIcon fill="red" />
    </Button>
  );
};
