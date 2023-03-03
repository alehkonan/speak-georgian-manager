import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { WordsTable } from '@/components/WordsTable';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const WordsPage: NextPage = () => {
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
      <WordsTable />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
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

export default WordsPage;