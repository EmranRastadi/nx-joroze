// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { FORM_SECTIONS } from '../../lib/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        res.setHeader(
          'Cache-Control',
          's-maxage=31536000, stale-while-revalidate'
        );
        return res.json(FORM_SECTIONS);
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    const responseMessage =
      error instanceof Error ? error.message : 'Something went wrong.';

    res.status(500).json({ message: responseMessage });
  }
}
