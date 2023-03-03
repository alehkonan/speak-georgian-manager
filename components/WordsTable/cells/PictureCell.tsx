import type { Word } from '@/typings';
import { useState } from 'react';
import { useUploadPicture } from '@/reactQuery/picture';
import { Button, Space, Upload, UploadFile } from 'antd';
import AntdImgCrop from 'antd-img-crop';
import Image from 'next/image';
import styles from './PictureCell.module.css';

type Props = {
  word: Word;
};

export const PictureCell = ({ word }: Props) => {
  const { upload, isUploading } = useUploadPicture(word.id);
  const [uploadFile, setUploadFile] = useState<UploadFile>();

  const onUpload = async () => {
    const formData = new FormData();
    if (uploadFile instanceof Blob) {
      formData.append('picture', uploadFile, word.en);
      upload(formData);
    }
  };

  const onCancel = () => {
    setUploadFile(undefined);
  };

  return (
    <Space direction="vertical" align="center">
      <AntdImgCrop>
        <Upload
          accept="image/*"
          onChange={({ file }) => setUploadFile(file)}
          beforeUpload={() => false}
          itemRender={() => null}
        >
          {word.pictureUrl ? (
            <Image
              className={styles.picture}
              src={word.pictureUrl}
              alt={word.en}
              width={100}
              height={100}
              priority
            />
          ) : (
            <Button size="small">Select picture</Button>
          )}
        </Upload>
      </AntdImgCrop>
      {uploadFile && (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={onUpload}
            loading={isUploading}
          >
            Upload
          </Button>
          <Button size="small" onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      )}
    </Space>
  );
};
