import { Category, Word } from '@/typings';
import { Database } from '@/typings/supabase';

type DatabaseWord = Database['public']['Tables']['words']['Row'];
type DatabaseCategory = Database['public']['Tables']['categories']['Row'];

export const mapWord = (word: DatabaseWord): Word => ({
  id: word.id,
  en: word.name_en,
  ka: word.name_ka,
  categoryId: word.category_id,
  pictureUrl: word.picture_url,
  transcription: word.transcription,
});

export const mapCategory = (category: DatabaseCategory): Category => ({
  id: category.id,
  name: category.name,
});
