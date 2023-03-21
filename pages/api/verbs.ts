import type { NextApiHandler } from 'next';
import type { Response, Verb } from '@/typings';
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

const handler: NextApiHandler<Response<Verb[]>> = async (req, res) => {
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
      const getVerbsDbResponse = await supabase.from('verbs').select();

      if (getVerbsDbResponse.error) {
        return res.status(500).json({
          errorMessage: getVerbsDbResponse.error.message,
        });
      }

      return res.json({ data: getVerbsDbResponse.data.map(mapVerb) });

    case 'POST':
      const verb = JSON.parse(req.body) as Omit<Verb, 'id'>;

      const addVerbDbResponse = await supabase
        .from('verbs')
        .insert({
          original: verb.original,
          first_person_in_past_word_id: verb.past.firstPerson,
          second_person_in_past_word_id: verb.past.secondPerson,
          third_person_in_past_word_id: verb.past.thirdPerson,
          first_person_in_present_word_id: verb.present.firstPerson,
          second_person_in_present_word_id: verb.present.secondPerson,
          third_person_in_present_word_id: verb.present.thirdPerson,
          first_person_in_future_word_id: verb.future.firstPerson,
          second_person_in_future_word_id: verb.future.secondPerson,
          third_person_in_future_word_id: verb.future.thirdPerson,
        })
        .select();

      if (addVerbDbResponse.error) {
        return res.status(500).json({
          errorMessage: addVerbDbResponse.error.message,
        });
      }

      return res.json({ data: addVerbDbResponse.data.map(mapVerb) });

    default:
      return res.status(400).json({
        errorMessage: 'This method is not allowed',
      });
  }
};

export default handler;
