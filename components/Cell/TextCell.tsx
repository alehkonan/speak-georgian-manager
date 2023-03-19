import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Button } from '../Button';
import { Input } from '../Input';
import styles from './styles.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const TextCell = ({ value: initValue, onChange }: Props) => {
  const [value, setValue] = useState(initValue);
  const [isEditMode, setEditMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeClick = () => {
    if (value !== initValue) onChange(value);
    setEditMode(false);
  };

  const onEditClick = () => {
    flushSync(() => setEditMode(true));
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <Input
        ref={inputRef}
        type="text"
        title={value}
        readOnly={!isEditMode}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <Button onClick={isEditMode ? onChangeClick : onEditClick}>
        {isEditMode ? 'Change' : 'Edit'}
      </Button>
    </div>
  );
};
