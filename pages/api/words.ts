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

const handler: NextApiHandler<Response<Word[]>> = async (req, res) => {
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
      const { data, error } = await supabase.from('words').select();

      if (error) {
        return res.status(500).json({
          errorMessage: 'Database error',
        });
      }

      const words = data.map(mapWord);

      return res.json({ data: words });

    default:
      return res.status(400).json({
        errorMessage: 'This method is not allowed',
      });
  }
};

export default handler;
