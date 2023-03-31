import type { PropsWithChildren } from 'react';
import type { LinkProps } from 'next/link';
import NextLink from 'next/link';
import styles from './styles.module.css';
import classNames from 'classnames';

type Props = Omit<LinkProps, 'className'> & {
  isActive?: boolean;
};

export const Link = (props: PropsWithChildren<Props>) => {
  return (
    <NextLink
      className={classNames([
        styles.link,
        { [styles.activeLink]: props.isActive },
      ])}
      {...props}
    />
  );
};
