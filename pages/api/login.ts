import { NextApiRequest, NextApiResponse } from 'next';

import { CMS } from '@/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.STAGING_SECRET) {
    res.status(404).json({ message: 'Invalid secret' });
  }

  res.setPreviewData(
    {},
    {
      maxAge: 3600 * 24 * 7, // The preview mode cookies expire after a week
    }
  );
  res.redirect('/');
}
