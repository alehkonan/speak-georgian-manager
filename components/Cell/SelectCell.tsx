import { CheckIcon, PencilIcon, XIcon } from '@primer/octicons-react';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Button } from '../Button';
import { Select, SelectOption } from '../Select';
import styles from './styles.module.css';

type Props = {
  value: SelectOption['value'];
  options?: SelectOption[];
  onChange: (value: SelectOption['value']) => void;
};

export const SelectCell = ({ value: initValue, options, onChange }: Props) => {
  const [value, setValue] = useState(initValue);
  const [isEditMode, setEditMode] = useState(false);

  const selectRef = useRef<HTMLSelectElement>(null);

  const onEditClick = () => {
    flushSync(() => setEditMode(true));
    selectRef.current?.focus();
  };

  const onChangeClick = () => {
    if (value != initValue) onChange(value);
    setEditMode(false);
  };

  const onCancelClick = () => {
    setValue(initValue);
    setEditMode(false);
  };

  if (!options) return null;

  return (
    <div className={styles.container}>
      <Select
        ref={selectRef}
        disabled={!isEditMode}
        title={options.find((option) => option.value == value)?.label}
        value={value}
        options={options}
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
