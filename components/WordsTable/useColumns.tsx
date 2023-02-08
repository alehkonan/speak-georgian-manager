import { Category, Word } from '@/typings';
import { Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DefaultOptionType } from 'antd/es/select';
import Image from 'next/image';

type Options = {
  categories: Category[];
};

const mapCategoriesToOptions = (category: Category): DefaultOptionType => ({
  value: category.id,
  label: category.name,
});

export const useColumns = ({ categories }: Options) => {
  const options = categories.map(mapCategoriesToOptions);

  const columns: ColumnsType<Word> = [
    {
      title: 'English word',
      dataIndex: 'en',
    },
    {
      title: 'Georgian word',
      dataIndex: 'ka',
    },
    {
      title: 'Transcription',
      dataIndex: 'transcription',
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      render: (value) => <Select options={options} defaultValue={value} />,
    },
    {
      title: 'Picture',
      dataIndex: 'pictureUrl',
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
  ];

  return columns;
};
