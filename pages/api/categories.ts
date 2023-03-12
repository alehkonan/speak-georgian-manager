import type { NextApiHandler } from 'next';
import type { Database } from '@/typings/supabase';
import type { Category, Response } from '@/typings';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

type DatabaseCategory = Database['public']['Tables']['categories']['Row'];

export const mapCategory = (category: DatabaseCategory): Category => ({
  id: category.id,
  name: category.name,
});

const handler: NextApiHandler<Response<Category[]>> = async (req, res) => {
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
      const { data, error } = await supabase
        .from('categories')
        .select()
        .order('name', { ascending: true });

      if (error) {
        return res.status(500).json({
          errorMessage: 'Database error',
        });
      }

      const categories = data.map(mapCategory);

      return res.json({ data: categories });

    case 'POST':
      const newCategory = JSON.parse(req.body) as Omit<Category, 'id'>;

      const insertRequest = await supabase
        .from('categories')
        .insert({ name: newCategory.name })
        .select();

      if (insertRequest.error) {
        return res.status(500).json({
          errorMessage: insertRequest.error.message,
        });
      }

      return res.json({ data: insertRequest.data.map(mapCategory) });

    default:
      return res.status(400).json({
        errorMessage: 'This method is not allowed',
      });
  }
};

export default handler;
