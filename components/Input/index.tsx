import { ComponentPropsWithRef, forwardRef } from 'react';
import styles from './styles.module.css';

type Props = Omit<ComponentPropsWithRef<'input'>, 'className'>;

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input ref={ref} size={15} className={styles.input} {...props} />
));

Input.displayName = 'Input';
