import type { NextApiHandler } from 'next';
import type { Phrase, Response } from '@/typings';
import type { Database } from '@/typings/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

type DatabasePhrase = Database['public']['Tables']['phrases']['Row'];

export const mapPhrase = (phrase: DatabasePhrase): Phrase => ({
  id: phrase.id,
  en: phrase.en,
  ka: phrase.ka,
  transcription: phrase.transcription,
  categoryId: phrase.category_id,
});

const handler: NextApiHandler<Response<Phrase[]>> = async (req, res) => {
  const supabase = createServerSupabaseClient<Database>({ req, res });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({
      errorMessage: 'Not authenticated',
    });
  }

  if (sessionError) {
    return res.status(500).json({
      errorMessage: 'Database error',
    });
  }

  switch (req.method) {
    case 'GET':
      const getPhrasesDbResponse = await supabase.from('phrases').select();

      if (getPhrasesDbResponse.error) {
        return res.status(500).json({
          errorMessage: getPhrasesDbResponse.error.message,
        });
      }

      const phrases = getPhrasesDbResponse.data.map(mapPhrase);

      return res.json({ data: phrases });

    default:
      return res.status(400).json({
        errorMessage: 'This method is not allowed',
      });
  }
};

export default handler;
