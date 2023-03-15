import type { NextPage } from 'next';
import Head from 'next/head';
import { useLogin } from '@/reactQuery/login';
import { useEffect } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const session = useSession();
  const { loginWithGoogle, isLoading } = useLogin();

  useEffect(() => {
    if (session) router.push('/');
  }, [router, session]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Head key="VerbsPage">
        <title>Speak Georgian Manager | Words</title>
        <meta
          name="description"
          content="This is a dashboard to manage Speak Georgian App"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => loginWithGoogle()}>Login with google</button>
    </>
  );
};

export default LoginPage;
