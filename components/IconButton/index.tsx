import type { ComponentPropsWithoutRef } from 'react';
import styles from './styles.module.css';

type Props = Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

export const IconButton = (props: Props) => {
  return <button className={styles.button} {...props} />;
};
