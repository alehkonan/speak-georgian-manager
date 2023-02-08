import type { GetServerSideProps, NextPage } from 'next';
import type { Database } from '@/typings/supabase';
import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Header } from '@/components/Header';
import { WordsTable } from '@/components/WordsTable';

const HomePage: NextPage = () => {
  return (
    <>
      <Head key="HomePage">
        <title>Speak Georgian Manager</title>
        <meta
          name="description"
          content="This is a dashboard to manage Speak Georgian App"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <WordsTable />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient<Database>(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default HomePage;
