import type { Word } from '@/typings';
import { mapWord } from '@/utils/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiHandler } from 'next';

type Response = {
  words?: Word[];
  errorMessage?: string;
};

const handler: NextApiHandler<Response> = async (req, res) => {
  const supabase = createServerSupabaseClient({ req, res });

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

      return res.json({ words });
    default:
      return res.status(400).json({
        errorMessage: 'This method is not allowed',
      });
  }
};

export default handler;
