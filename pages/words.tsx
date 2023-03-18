import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { WordsTable } from '@/features/WordsTable';
import { AddNewCategory } from '@/features/AddNewCategory';
import { AddNewWord } from '@/features/AddNewWord';
import { Row } from '@/components/Row';
import { Col } from '@/components/Col';

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
      <Col>
        <Row>
          <AddNewCategory />
          <AddNewWord />
        </Row>
        <hr />
        <WordsTable />
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

export default WordsPage;
