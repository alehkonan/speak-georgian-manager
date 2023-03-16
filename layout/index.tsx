import type { PropsWithChildren } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { useNavigation } from './useNavigation';
import { useLogout } from '@/reactQuery/logout';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { Row } from '@/components/Row';
import styles from './styles.module.css';

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
            <Row>
              <p>logged as {session?.user?.email}</p>
              <Button onClick={() => logout()}>Logout</Button>
            </Row>
          </header>
        </div>
      )}
      <main className={styles.main}>
        {isLoading ? <p>Loading...</p> : children}
      </main>
    </>
  );
};
