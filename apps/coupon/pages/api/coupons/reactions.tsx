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

export async function getCouponReactionDictionary() {
  const couponDictionaryData = await redis.get('coupons');
  const couponDictionary: Record<
    string,
    { id: string; likes: number; dislikes: number }
  > = JSON.parse(couponDictionaryData || '{}');

  return couponDictionary;
}

export async function increaseCouponReactionCount(
  couponId: string,
  type: ReactionType
) {
  const couponDictionary = await getCouponReactionDictionary();

  if (!(couponId in couponDictionary)) {
    couponDictionary[couponId] = {
      id: couponId,
      likes: 0,
      dislikes: 0,
    };
  }

  let count = 0;

  if (type === 'like') {
    count = couponDictionary[couponId].likes + 1;
    couponDictionary[couponId].likes = count;
  } else {
    count = couponDictionary[couponId].dislikes + 1;
    couponDictionary[couponId].dislikes = count;
  }

  await redis.set('coupons', JSON.stringify(couponDictionary));

  return count;
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
    case 'GET':
      try {
        return res.json(await getCouponReactionDictionary());
      } catch (error) {
        const responseMessage =
          error instanceof Error ? error.message : 'Something went wrong.';

        res.status(500).json({ message: responseMessage });
      }
      break;
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
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
