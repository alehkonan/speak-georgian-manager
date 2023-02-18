import type { Word } from '@/typings';
import { Button, message, Upload, UploadFile } from 'antd';
import Image from 'next/image';
import { useId, useState } from 'react';
import styles from './PictureCell.module.css';

type Props = {
  word: Word;
};

export const PictureCell = ({ word }: Props) => {
  const id = useId();

  const [file, setFile] = useState<UploadFile>({
    uid: id,
    name: word.en,
    status: 'done',
    url: word.pictureUrl || undefined,
  });

  return (
    <div>
      <Upload
        name={word.en}
        accept="image/*"
        fileList={[file]}
        customRequest={({ file }) => console.log('custom request')}
        onChange={(params) => setFile(params.file)}
        onDrop={(dropEvent) => console.log('drop ', dropEvent)}
        onRemove={(file) => console.log('remove ', file)}
      >
        <Button>Select file</Button>
      </Upload>
    </div>
  );
};
