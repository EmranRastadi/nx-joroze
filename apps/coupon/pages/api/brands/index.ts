import { NextApiRequest, NextApiResponse } from 'next';
import { fetchFromContentful } from '../..';

export default async function brandHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { couponEntityCollection } =
          await fetchFromContentful().BrandSearch({
            name_contains: '',
          });

        return res.json(couponEntityCollection?.items || []);
      } catch (error) {
        const responseMessage =
          error instanceof Error ? error.message : 'Something went wrong.';

        res.status(500).json({ message: responseMessage });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
