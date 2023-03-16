import { Button } from '@/components/Button';
import { useWord } from '@/reactQuery/word';

type Props = {
  wordId: number;
};

export const ActionCell = ({ wordId }: Props) => {
  const { deleteWord, isDeleting } = useWord();

  if (isDeleting) return <span>Loading...</span>;

  return <Button onClick={() => deleteWord(wordId)}>Delete</Button>;
};
