import type { Response, Verb } from '@/typings';
import type { NextApiHandler } from 'next';
import type { Database } from '@/typings/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

type DatabaseVerb = Database['public']['Tables']['verbs']['Row'];

const mapVerb = (verb: DatabaseVerb): Verb => ({
  id: verb.id,
  original: verb.original,
  past: {
    firstPerson: verb.first_person_in_past_word_id,
    secondPerson: verb.second_person_in_past_word_id,
    thirdPerson: verb.third_person_in_past_word_id,
  },
  present: {
    firstPerson: verb.first_person_in_present_word_id,
    secondPerson: verb.second_person_in_present_word_id,
    thirdPerson: verb.third_person_in_present_word_id,
  },
  future: {
    firstPerson: verb.first_person_in_future_word_id,
    secondPerson: verb.second_person_in_future_word_id,
    thirdPerson: verb.third_person_in_future_word_id,
  },
});

const handler: NextApiHandler<Response<Verb>> = async (req, res) => {
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
    const verbId = Number(req.query.id);
    const verb = JSON.parse(req.body) as Omit<Partial<Verb>, 'id'>;

    if (!verbId) {
      return res.status(400).json({ errorMessage: 'Verb id is not defined' });
    }

    const { data, error } = await supabase
      .from('verbs')
      .update({
        original: verb.original,
        first_person_in_past_word_id: verb.past?.firstPerson,
        second_person_in_past_word_id: verb.past?.secondPerson,
        third_person_in_past_word_id: verb.past?.thirdPerson,
        first_person_in_present_word_id: verb.present?.firstPerson,
        second_person_in_present_word_id: verb.present?.secondPerson,
        third_person_in_present_word_id: verb.present?.thirdPerson,
        first_person_in_future_word_id: verb.future?.firstPerson,
        second_person_in_future_word_id: verb.future?.secondPerson,
        third_person_in_future_word_id: verb.future?.thirdPerson,
      })
      .eq('id', verbId)
      .select();

    if (error) {
      return res.status(500).json({
        errorMessage: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({ errorMessage: 'Verb is not found' });
    }

    return res.json({ data: data.map(mapVerb).at(0) });
  }

  if (req.method === 'DELETE') {
    const verbId = Number(req.query.id);

    if (!verbId) {
      return res.status(400).json({ errorMessage: 'Verb id is not defined' });
    }

    const { error } = await supabase.from('verbs').delete().eq('id', verbId);

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
