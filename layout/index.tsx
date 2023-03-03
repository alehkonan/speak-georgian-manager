import { PropsWithChildren } from 'react';
import { Header } from '@/components/Header';
import styles from './styles.module.css';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className={styles.container}>{children}</main>
    </>
  );
};
