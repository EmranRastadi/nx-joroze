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

export type CouponStats = {
  id: string;
  likes: number;
  dislikes: number;
  linkOpened: number;
};

export type CouponPusherChannelName = 'coupons';
export type CouponPusherEventType = 'like' | 'dislike' | 'linkClick';
export type CouponPusherEventPayload = CouponStats;

export type CouponPostVariables = {
  type: CouponPusherEventType;
  id: string;
};

export async function getCouponStatsDictionary() {
  const couponDictionaryData = await redis.get('coupons');
  const couponDictionary: Record<string, CouponStats> = JSON.parse(
    couponDictionaryData || '{}'
  );

  return couponDictionary;
}

export function setCouponStatsDictionary(
  couponDictionary: Record<string, CouponStats>
) {
  return redis.set('coupons', JSON.stringify(couponDictionary));
}

export async function deleteCouponStatsById(couponId: string) {
  const couponDictionary = await getCouponStatsDictionary();
  const selectedItem = couponDictionary[couponId];
  delete couponDictionary[couponId];

  await setCouponStatsDictionary(couponDictionary);

  return selectedItem;
}

export async function updateCouponStatsById(
  couponId: string,
  cb: (coupon: CouponStats) => Partial<CouponStats>
) {
  const couponDictionary = await getCouponStatsDictionary();

  if (!(couponId in couponDictionary)) {
    couponDictionary[couponId] = {
      id: couponId,
      likes: 0,
      dislikes: 0,
      linkOpened: 0,
    };
  }

  const stats = cb({ ...couponDictionary[couponId] });

  const updatedCouponStats = {
    ...couponDictionary[couponId],
    ...stats,
  };

  couponDictionary[couponId] = updatedCouponStats;

  await setCouponStatsDictionary(couponDictionary);

  return updatedCouponStats;
}

export const pushCouponStatsEvent = (
  channelName: CouponPusherChannelName,
  eventName: CouponPusherEventType,
  payload: CouponPusherEventPayload
) => pusher.trigger(channelName, eventName, payload);

export default async function reactionsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        return res.json(await getCouponStatsDictionary());
      } catch (error) {
        const responseMessage =
          error instanceof Error ? error.message : 'Something went wrong.';

        res.status(500).json({ message: responseMessage });
      }
      break;
    case 'POST':
      try {
        const { type, id }: CouponPostVariables = body;

        if (!type) {
          return res.json({
            message: 'Missing "type" field.',
          });
        } else if (!id) {
          return res.json({
            message: 'Missing "id" field.',
          });
        }

        if (type !== 'like' && type !== 'dislike') {
          return res.json({
            message: 'Not supported.',
          });
        }

        const updatedCouponStats = await updateCouponStatsById(
          id,
          (couponStats) => {
            switch (type) {
              case 'like':
                return {
                  likes: couponStats.likes + 1,
                };
              case 'dislike':
                return {
                  dislikes: couponStats.dislikes + 1,
                };
              default:
                break;
            }

            return {};
          }
        );

        await pushCouponStatsEvent('coupons', type, updatedCouponStats);

        return res.json({
          message: 'Coupon stats have successfully been pushed.',
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
