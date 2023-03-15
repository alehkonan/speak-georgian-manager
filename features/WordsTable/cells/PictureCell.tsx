import type { Word } from '@/typings';
import Image from 'next/image';
import styles from './PictureCell.module.css';

type Props = {
  word: Word;
};

export const PictureCell = ({ word }: Props) => {
  return (
    <div>
      {word.pictureUrl ? (
        <Image
          className={styles.picture}
          src={word.pictureUrl}
          alt={word.en}
          width={70}
          height={70}
          priority
        />
      ) : (
        <input className={styles.file} type="file" accept="image/*" />
      )}
    </div>
  );
};
