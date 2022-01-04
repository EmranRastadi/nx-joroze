import { NextApiRequest, NextApiResponse } from 'next';
import { fetchFromContentful } from '../..';

export default async function categoryHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { couponCategoryCollection } =
          await fetchFromContentful().Categories({
            preview: false,
          });

        const categories = couponCategoryCollection?.items || [];

        res.setHeader(
          'Cache-Control',
          's-maxage=31536000, stale-while-revalidate'
        );
        return res.json(categories);
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
