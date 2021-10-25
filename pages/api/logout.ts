import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.clearPreviewData();
  res.end('Logged out of staging environment');
}
