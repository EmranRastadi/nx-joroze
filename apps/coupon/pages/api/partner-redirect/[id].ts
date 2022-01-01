import { NextApiRequest, NextApiResponse } from 'next';
import { fetchFromContentful } from '../..';

export default async function userHandler(
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
        const couponId = Array.isArray(id) ? id[0] : id;
        const { couponEntry } =
          await fetchFromContentful().CouponByIdReferringUrl({
            id: couponId,
          });

        res.setHeader(
          'Cache-Control',
          's-maxage=31536000, stale-while-revalidate'
        );

        return couponEntry?.referringUrl
          ? res.redirect(couponEntry.referringUrl)
          : res.redirect('/');
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
