import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';
import redis from '../../../lib/redis';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_APP_SECRET as string,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
  useTLS: true,
});

export type ReactionPusherChannelName = 'coupons';
export type ReactionPusherEventName = 'reaction';
export type ReactionType = 'like' | 'dislike';
export type ReactionPusherEventPayload = {
  type?: ReactionType;
  couponId?: string;
  count?: number;
};

export type ReactionPostVariables = {
  type: ReactionType;
  id: string;
};

// export function getCouponReactionCount(couponId: string, type: ReactionType) {
//   return redis.get(`coupon.${couponId}.${type}`);
// }

export function increaseCouponReactionCount(
  couponId: string,
  type: ReactionType
) {
  return redis.incrby(`coupon.${couponId}.${type}`, 1);
}

const pushCouponReactionEvent = (
  channelName: ReactionPusherChannelName,
  eventName: ReactionPusherEventName,
  payload: ReactionPusherEventPayload
) => pusher.trigger(channelName, eventName, payload);

export default async function reactionsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { type, id }: ReactionPostVariables = body;

  switch (method) {
    case 'POST':
      try {
        const eventPayload: ReactionPusherEventPayload = {
          type: type,
          count: await increaseCouponReactionCount(id, type),
          couponId: id,
        };

        await pushCouponReactionEvent('coupons', 'reaction', eventPayload);

        return res.json({
          message: 'Reaction has been successfully pushed.',
        });
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
}
