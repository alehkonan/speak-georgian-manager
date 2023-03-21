import type { GetServerSideProps, NextPage } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';
import { VerbsTable } from '@/features/VerbsTable';
import { Col } from '@/components/Col';
import { AddNewVerb } from '@/features/AddNewVerb';

const VerbsPage: NextPage = () => {
  return (
    <>
      <Head key="VerbsPage">
        <title>Speak Georgian Manager | Verbs</title>
        <meta
          name="description"
          content="This is a dashboard to manage Speak Georgian App"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Col>
        <AddNewVerb />
        <hr />
        <VerbsTable />
      </Col>
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

export default VerbsPage;
