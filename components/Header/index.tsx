import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Button, Col, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

export const Header = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const onSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <Row justify="end" align="middle" gutter={[10, 0]}>
        <Col>
          <Typography.Text>logged as {user?.email}</Typography.Text>
        </Col>
        <Col>
          <Button block onClick={onSignOut}>
            Logout
          </Button>
        </Col>
      </Row>
    </div>
  );
};
