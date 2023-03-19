import { Button } from '@/components/Button';
import { useWord } from '@/reactQuery/word';
import { TrashIcon } from '@primer/octicons-react';

type Props = {
  wordId: number;
};

export const DeleteButton = ({ wordId }: Props) => {
  const { deleteWord, isDeleting } = useWord();

  if (isDeleting) return <span>Loading...</span>;

  return (
    <Button title="Delete" onClick={() => deleteWord(wordId)}>
      <TrashIcon fill="red" />
    </Button>
  );
};
