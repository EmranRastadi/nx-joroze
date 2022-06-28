import { NextApiRequest, NextApiResponse } from 'next';
import {
  CouponPostVariables,
  getClientIpAddress,
  getCouponStatsWithClientChoice,
  pushCouponStatsEvent,
  resetClientVotesByCouponId,
  updateCouponStatsById,
} from '.';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function couponStatsClearHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, headers } = req;
  const clientIpAddress = getClientIpAddress(headers);

  switch (method) {
    case 'POST':
      try {
        const { type, id }: CouponPostVariables = body;

        if (!clientIpAddress || !type || !id || type !== 'clear') {
          return res.json(await getCouponStatsWithClientChoice());
        }

        const [updatedCouponStats] = await Promise.all([
          updateCouponStatsById(id, async (couponStats) => {
            return {
              likes: 0,
              dislikes: 0,
            };
          }),
          resetClientVotesByCouponId(id),
        ]);

        await Promise.all([
          pushCouponStatsEvent('coupons', type, updatedCouponStats),
        ]);

        return res.json(await getCouponStatsWithClientChoice(clientIpAddress));
      } catch (error) {
        const responseMessage =
          error instanceof Error ? error.message : 'Something went wrong.';

        res.status(500).json({ message: responseMessage });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
