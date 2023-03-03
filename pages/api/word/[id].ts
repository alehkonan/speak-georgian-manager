import type { Response, Word } from '@/typings';
import { Database } from '@/typings/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiHandler } from 'next';

type DatabaseWord = Database['public']['Tables']['words']['Row'];

export const mapWord = (word: DatabaseWord): Word => ({
  id: word.id,
  en: word.name_en,
  ka: word.name_ka,
  categoryId: word.category_id,
  pictureUrl: word.picture_url,
  transcription: word.transcription,
});

const handler: NextApiHandler<Response<Word>> = async (req, res) => {
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

  if (req.method === 'PUT') {
    const wordId = Number(req.query.id);
    const word: Omit<Partial<Word>, 'id'> = JSON.parse(req.body);

    if (!wordId) {
      return res.status(400).json({ errorMessage: 'Word id is not defined' });
    }

    const { data, error } = await supabase
      .from('words')
      .update({
        name_en: word.en,
        name_ka: word.ka,
        transcription: word.transcription,
        category_id: word.categoryId,
        picture_url: word.pictureUrl,
      })
      .eq('id', wordId)
      .select();

    if (error) {
      return res.status(500).json({
        errorMessage: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({ errorMessage: 'Word is not found' });
    }

    return res.json({ data: data.map(mapWord).at(0) });
  }

  if (req.method === 'DELETE') {
    const wordId = Number(req.query.id);

    if (!wordId) {
      return res.status(400).json({ errorMessage: 'Word id is not defined' });
    }

    const { error } = await supabase.from('words').delete().eq('id', wordId);

    if (error) {
      return res.status(500).json({
        errorMessage: error.message,
      });
    }

    return res.status(204).end();
  }

  return res.status(400).json({
    errorMessage: 'This method is not allowed',
  });
};

export default handler;
