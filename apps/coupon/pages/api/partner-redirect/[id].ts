import { NextApiRequest, NextApiResponse } from 'next';
import { fetchFromContentful } from '../..';
import { pushCouponStatsEvent, updateCouponStatsById } from '../coupons/stats';

export default async function partnerRedirectHandler(
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

        if (!couponId) {
          throw new Error('No ID provided');
        }

        const updatedCouponStats = await updateCouponStatsById(
          couponId,
          (couponStats) => {
            return {
              linkOpened: (couponStats.linkOpened || 0) + 1,
            };
          }
        );

        pushCouponStatsEvent('coupons', 'linkClick', updatedCouponStats);

        const { couponEntry } =
          await fetchFromContentful().CouponByIdReferringUrl({
            id: couponId,
          });

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

export const config = {
  runtime: 'experimental-edge',
};
