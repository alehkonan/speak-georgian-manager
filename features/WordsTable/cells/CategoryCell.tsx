import type { Word } from '@/typings';
import { useCategories } from '@/reactQuery/categories';
import { useWord } from '@/reactQuery/word';

type Props = {
  word: Word;
};

export const CategoryCell = ({ word }: Props) => {
  const { categories } = useCategories();
  const { updateWord } = useWord();

  return (
    <select
      onChange={({ target }) =>
        updateWord({ id: word.id, categoryId: Number(target.value) })
      }
    >
      {categories?.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};
