import { useEffect, useRef, useState } from 'react';
import { SearchIcon, XIcon } from '@primer/octicons-react';
import { useDebounce } from '@/hooks';
import { Input } from '../Input';
import { IconButton } from '../IconButton';
import styles from './styles.module.css';

type Props = {
  onSearch: (value: string) => void;
};

export const Search = ({ onSearch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const searchValue = useDebounce(value);

  useEffect(() => {
    onSearch(searchValue);
  }, [onSearch, searchValue]);

  return (
    <div className={styles.container}>
      <Input
        ref={inputRef}
        placeholder="Search..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className={styles.iconContainer}>
        {value && (
          <IconButton onClick={() => setValue('')}>
            <XIcon />
          </IconButton>
        )}
        <IconButton onClick={() => inputRef.current?.focus()}>
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
};
