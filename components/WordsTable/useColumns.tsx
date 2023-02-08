import type { Category, Word } from '@/typings';
import type { ColumnsType } from 'antd/es/table';
import type { DefaultOptionType } from 'antd/es/select';
import { Select, Typography } from 'antd';
import Image from 'next/image';
import { useMemo } from 'react';
import styles from './styles.module.css';

type Options = {
  categories: Category[] | undefined;
};

const mapCategoriesToOptions = (category: Category): DefaultOptionType => ({
  value: category.id,
  label: category.name,
});

export const useColumns = ({ categories }: Options) => {
  const options = categories?.map(mapCategoriesToOptions);

  const columns = useMemo<ColumnsType<Word>>(
    () => [
      {
        title: 'English word',
        dataIndex: 'en',
        width: '20%',
        sorter: (a, b) => a.en.toLowerCase().localeCompare(b.en.toLowerCase()),
        showSorterTooltip: false,
        render: (value: string) => (
          <Typography.Text
            className={styles.text}
            editable={{
              text: value,
              // TODO send data to the server
              onChange: (newValue) => console.log(newValue),
            }}
          >
            {value}
          </Typography.Text>
        ),
      },
      {
        title: 'Georgian word',
        dataIndex: 'ka',
        width: '20%',
        sorter: (a, b) => a.ka.toLowerCase().localeCompare(b.ka.toLowerCase()),
        showSorterTooltip: false,
        render: (value: string) => (
          <Typography.Text
            className={styles.text}
            editable={{
              text: value,
              // TODO send data to the server
              onChange: (newValue) => console.log(newValue),
            }}
          >
            {value}
          </Typography.Text>
        ),
      },
      {
        title: 'Transcription',
        dataIndex: 'transcription',
        width: '20%',
        render: (value: string) => (
          <Typography.Text
            className={styles.text}
            editable={{
              text: value,
              // TODO send data to the server
              onChange: (newValue) => console.log(newValue),
            }}
          >
            {value}
          </Typography.Text>
        ),
      },
      {
        title: 'Category',
        dataIndex: 'categoryId',
        width: '20%',
        render: (value) => (
          <Select
            options={options}
            defaultValue={value}
            // TODO send data to the server
            onChange={(value, option) => console.log(value, option)}
          />
        ),
      },
      {
        title: 'Picture',
        dataIndex: 'pictureUrl',
        width: '10%',
        render: (value) =>
          value && (
            <Image
              src={value}
              width={100}
              height={100}
              alt="word"
              style={{ objectFit: 'cover' }}
            />
          ),
      },
    ],
    [options]
  );

  return columns;
};
