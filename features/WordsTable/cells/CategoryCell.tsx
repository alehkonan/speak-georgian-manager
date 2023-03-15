import { useMemo } from 'react';
import { useCategories } from '@/reactQuery/categories';
import { useWord } from '@/reactQuery/word';
import { Category, Word } from '@/typings';
import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

type Props = {
  word: Word;
};

const mapToOptions = (category: Category): DefaultOptionType => ({
  value: category.id,
  label: category.name,
});

export const CategoryCell = ({ word }: Props) => {
  const { categories, isLoading } = useCategories();
  const { updateWord, isUpdating } = useWord();

  const categoryOptions = useMemo(
    () => categories?.map(mapToOptions),
    [categories]
  );

  return (
    <Select
      style={{ width: '100%' }}
      options={categoryOptions}
      loading={isLoading || isUpdating}
      value={word.categoryId}
      onChange={(value) => updateWord({ id: word.id, categoryId: value })}
    />
  );
};
