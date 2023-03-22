import { TrashIcon } from '@primer/octicons-react';
import { Button } from '@/components/Button';
import { useDeleteVerb } from '@/reactQuery/verb';

type Props = {
  verbId: number;
};

export const DeleteVerbButton = ({ verbId }: Props) => {
  const { deleteVerb, isDeleting } = useDeleteVerb();

  if (isDeleting) return <span>Loading...</span>;

  return (
    <Button title="Delete" onClick={() => deleteVerb(verbId)}>
      <TrashIcon fill="red" />
    </Button>
  );
};
