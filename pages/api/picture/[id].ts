import type { NextApiHandler, NextApiRequest, PageConfig } from 'next';
import type { Response } from '@/typings';
import type { Database } from '@/typings/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import formidable from 'formidable';

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const parseRequest = async (req: NextApiRequest) => {
  const form = formidable();

  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(req, async (error, fields, files) => {
        if (error) reject(error);
        resolve({ fields, files });
      });
    }
  );
};

const handler: NextApiHandler<Response<unknown>> = async (req, res) => {
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

  if (req.method === 'POST') {
    try {
      const { files } = await parseRequest(req);

      // TODO implement uploading picture to DB
      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  }

  return res.status(400).json({
    errorMessage: 'This method is not allowed',
  });
};

export default handler;
