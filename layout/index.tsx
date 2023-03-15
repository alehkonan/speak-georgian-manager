import { PropsWithChildren, useEffect } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import Link from 'next/link';

import { useNavigation } from './useNavigation';
import styles from './styles.module.css';
import { useLogout } from '@/reactQuery/logout';

export const Layout = ({ children }: PropsWithChildren) => {
  const session = useSession();

  const { logout, isLoading } = useLogout();
  const { navItems } = useNavigation();

  return (
    <>
      {session && (
        <div className={styles.headerContainer}>
          <header className={styles.header}>
            <nav className={styles.navigation}>
              <ul className={styles.list}>
                {navItems.map(({ id, link, label }) => (
                  <li key={id}>
                    <Link href={link}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p>logged as {session?.user?.email}</p>
            <button onClick={() => logout()}>Logout</button>
          </header>
        </div>
      )}
      <main className={styles.main}>
        {isLoading ? <p>Loading...</p> : children}
      </main>
    </>
  );
};
