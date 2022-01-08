import { NextApiRequest, NextApiResponse } from 'next';
import { fetchFromContentful } from '../..';
import redis from '../../../lib/redis';
import {
  getCouponReactionDictionary,
  pushCouponReactionEvent,
  ReactionPusherEventPayload,
} from '../coupons/reactions';

export async function increaseCouponLinkOpenCount(couponId: string) {
  const couponDictionary = await getCouponReactionDictionary();

  if (!(couponId in couponDictionary)) {
    couponDictionary[couponId] = {
      id: couponId,
      likes: 0,
      dislikes: 0,
      linkOpened: 0,
    };
  }

  const count = (couponDictionary[couponId].linkOpened || 0) + 1;
  couponDictionary[couponId].linkOpened = count;

  await redis.set('coupons', JSON.stringify(couponDictionary));

  return count;
}

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
        const eventPayload: ReactionPusherEventPayload = {
          type: 'linkClick',
          count: await increaseCouponLinkOpenCount(couponId),
          couponId,
        };

        pushCouponReactionEvent('coupons', 'reaction', eventPayload);

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
