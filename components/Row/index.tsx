import type { ComponentPropsWithoutRef } from 'react';
import styles from './styles.module.css';

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'className'>;

export const Row = (props: Props) => {
  return <div className={styles.row} {...props} />;
};
