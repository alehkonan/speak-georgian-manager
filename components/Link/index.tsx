import type { PropsWithChildren } from 'react';
import type { LinkProps } from 'next/link';
import NextLink from 'next/link';
import styles from './styles.module.css';

type Props = Omit<LinkProps, 'className'>;

export const Link = (props: PropsWithChildren<Props>) => {
  return <NextLink className={styles.link} {...props} />;
};
