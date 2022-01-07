import { NextApiRequest, NextApiResponse } from 'next';
import { fetchFromContentful } from '../../../';

export default async function couponsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const brandId = Array.isArray(id) ? id[0] : id;

        const { couponEntryCollection } = await fetchFromContentful().Coupons({
          brandId,
        });
        return res.json(couponEntryCollection?.items || []);
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
