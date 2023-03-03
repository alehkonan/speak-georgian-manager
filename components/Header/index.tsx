import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Button, Col, Menu, Row, Typography, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

const menuItems: MenuProps['items'] = [
  { key: '/words', label: 'words' },
  { key: '/verbs', label: 'verbs' },
  { key: '/phrases', label: 'phrases' },
];

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
      <Row align="middle" gutter={10}>
        <Col flex={1}>
          <Menu
            onClick={({ key }) => router.push(key)}
            mode="horizontal"
            items={menuItems}
            defaultSelectedKeys={[router.asPath]}
          />
        </Col>
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
