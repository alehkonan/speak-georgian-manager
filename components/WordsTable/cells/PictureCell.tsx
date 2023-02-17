import type { Word } from '@/typings';
import Image from 'next/image';

type Props = {
  word: Word;
};

export const PictureCell = ({ word }: Props) => {
  return (
    <Image
      src={word.pictureUrl || ''}
      width={100}
      height={100}
      alt={word.en}
      style={{ objectFit: 'cover' }}
    />
  );
};
