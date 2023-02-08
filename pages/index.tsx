import type { Category, Word } from '@/typings';
import Head from 'next/head';
import { Col, Row } from 'antd';
import { WordsTable } from '@/components/WordsTable';
import { GetServerSideProps, NextPage } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { mapCategory, mapWord } from '@/utils/supabase';
import { Header } from '@/components/Header';
import { Database } from '@/typings/supabase';

type Props = {
  words: Word[];
  categories: Category[];
};

const HomePage: NextPage<Props> = ({ words, categories }) => {
  return (
    <>
      <Head key="HomePage">
        <title>Speak Georgian Manager</title>
      </Head>
      <Header />
      <Row justify="center">
        <Col xs={24} lg={20} xl={18}>
          <WordsTable words={words} categories={categories} />
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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

  const wordsResponse = await supabase.from('words').select();
  const categoriesResponse = await supabase.from('categories').select();

  if (wordsResponse.error || categoriesResponse.error) {
    return {
      notFound: true,
    };
  }

  const words = wordsResponse.data.map(mapWord);
  const categories = categoriesResponse.data.map(mapCategory);

  console.log(categories);

  return {
    props: {
      words,
      categories,
    },
  };
};

export default HomePage;
