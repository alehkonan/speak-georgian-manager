import type { ComponentPropsWithRef } from 'react';
import { forwardRef } from 'react';
import styles from './styles.module.css';

export type SelectOption = {
  value?: string | number;
  label?: string;
};

type Props = Omit<ComponentPropsWithRef<'select'>, 'className'> & {
  options: SelectOption[];
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ options, ...props }, ref) => {
    return (
      <select ref={ref} className={styles.select} {...props}>
        <option value={undefined}>Empty</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';
