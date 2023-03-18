import type { ComponentPropsWithoutRef } from 'react';
import styles from './styles.module.css';

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'className'>;

export const Col = (props: Props) => {
  return <div className={styles.col} {...props} />;
};
