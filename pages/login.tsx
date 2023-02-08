import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Button, Card, Divider, Typography } from 'antd';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '@/styles/login.module.css';
import { LoginForm } from '@/components/LoginForm';

const LoginPage: NextPage = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleGoolgeSignIn = () => {
    supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  };

  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  return (
    <>
      <Head key="LoginPage">
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <Card title="Please login to manage words for Speak Georgian App">
          <LoginForm />
          <Divider>
            <Typography.Text>Or</Typography.Text>
          </Divider>
          <Button block onClick={handleGoolgeSignIn}>
            Sign in with Google
          </Button>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
