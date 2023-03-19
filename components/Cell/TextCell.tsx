import { CheckIcon, PencilIcon, XIcon } from '@primer/octicons-react';
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

  const onEditClick = () => {
    flushSync(() => setEditMode(true));
    inputRef.current?.focus();
  };

  const onChangeClick = () => {
    if (value !== initValue) onChange(value);
    setEditMode(false);
  };

  const onCancelClick = () => {
    setValue(initValue);
    setEditMode(false);
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
      <Button
        title={isEditMode ? 'Save' : 'Edit'}
        onClick={isEditMode ? onChangeClick : onEditClick}
      >
        {isEditMode ? <CheckIcon /> : <PencilIcon />}
      </Button>
      {isEditMode && (
        <Button title="Cancel" onClick={onCancelClick}>
          <XIcon />
        </Button>
      )}
    </div>
  );
};
