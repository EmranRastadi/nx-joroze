import pusher from '../../../../lib/pusher';
import { IncomingHttpHeaders } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../../../lib/redis';

export type CouponStats = {
  id: string;
  likes: number;
  dislikes: number;
  linkOpened: number;
  lastChosen?: CouponPusherEventVoteType;
};

export type CouponPusherChannelName = 'coupons';
export type CouponPusherEventVoteType = 'like' | 'dislike';
export type CouponPusherEventType =
  | CouponPusherEventVoteType
  | 'linkClick'
  | 'clear';
export type CouponPusherEventPayload = CouponStats;

export type CouponPostVariables = {
  type: CouponPusherEventType;
  id: string;
};

export async function resetClientVotesByCouponId(couponId: string) {
  const couponVoteDictionaryData = await redis.hgetall('client:ip');

  for (const ipAddress in couponVoteDictionaryData) {
    const couponIdToPusherTypeDictionary: Record<
      string,
      CouponPusherEventType
    > = JSON.parse(couponVoteDictionaryData[ipAddress]);
    delete couponIdToPusherTypeDictionary[couponId];

    couponVoteDictionaryData[ipAddress] = JSON.stringify(
      couponIdToPusherTypeDictionary
    );
  }

  redis.hset('client:ip', couponVoteDictionaryData);
}

export async function getClientVoteDictionaryByIpAddress(ipAddress: string) {
  const couponVoteDictionaryData = await redis.hget('client:ip', ipAddress);
  const couponVoteDictionary: Record<string, CouponPusherEventVoteType> =
    JSON.parse(couponVoteDictionaryData || '{}');

  return couponVoteDictionary;
}

export function setClientVoteDictionaryByIpAddress(
  ipAddress: string,
  couponVoteDictionary: Record<string, CouponPusherEventVoteType>
) {
  return redis.hset(
    'client:ip',
    ipAddress,
    JSON.stringify(couponVoteDictionary)
  );
}

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

// TOOD: Delete all saved client specific stats as well for that coupon ID
export async function deleteCouponStatsById(couponId: string) {
  const couponDictionary = await getCouponStatsDictionary();
  const selectedItem = couponDictionary[couponId];
  delete couponDictionary[couponId];

  await setCouponStatsDictionary(couponDictionary);

  return selectedItem;
}

export async function getCouponStatsWithClientChoice(clientIpAddress?: string) {
  const couponStatsDictionary = await getCouponStatsDictionary();

  if (!clientIpAddress) {
    return couponStatsDictionary;
  }

  const clientVoteDictionary = await getClientVoteDictionaryByIpAddress(
    clientIpAddress
  );

  for (const couponId in clientVoteDictionary) {
    couponStatsDictionary[couponId].lastChosen = clientVoteDictionary[couponId];
  }

  return couponStatsDictionary;
}

export async function updateCouponStatsById(
  couponId: string,
  cb: (
    coupon: CouponStats
  ) => Promise<Partial<CouponStats>> | Partial<CouponStats>
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

  const stats = await cb({ ...couponDictionary[couponId] });

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

export function getClientIpAddress(headers: IncomingHttpHeaders) {
  if (process.env.NODE_ENV === 'development') {
    return 'localhost';
  }

  const clientIpAddressHeaderValue = headers['x-real-ip'];
  const clientIpAddress = Array.isArray(clientIpAddressHeaderValue)
    ? clientIpAddressHeaderValue[0]
    : clientIpAddressHeaderValue;

  return clientIpAddress;
}

export default async function couponStatsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, headers } = req;
  const clientIpAddress = getClientIpAddress(headers);

  switch (method) {
    case 'GET':
      try {
        return res.json(await getCouponStatsWithClientChoice(clientIpAddress));
      } catch (error) {
        const responseMessage =
          error instanceof Error ? error.message : 'Something went wrong.';

        res.status(500).json({ message: responseMessage });
      }
      break;
    case 'POST':
      try {
        const { type, id }: CouponPostVariables = body;

        if (
          !clientIpAddress ||
          !type ||
          !id ||
          (type !== 'like' && type !== 'dislike')
        ) {
          return res.json(await getCouponStatsWithClientChoice());
        }

        const clientVoteDictionary = await getClientVoteDictionaryByIpAddress(
          clientIpAddress
        );

        const prevClientVoteType = clientVoteDictionary[id];

        if (type === prevClientVoteType) {
          return res.json(
            await getCouponStatsWithClientChoice(clientIpAddress)
          );
        }

        const updatedCouponStats = await updateCouponStatsById(
          id,
          async (couponStats) => {
            const updated = prevClientVoteType
              ? {
                  likes: couponStats.likes - 1,
                  dislikes: couponStats.dislikes - 1,
                }
              : {};

            switch (type) {
              case 'like':
                return {
                  ...updated,
                  likes: couponStats.likes + 1,
                };
              case 'dislike':
                return {
                  ...updated,
                  dislikes: couponStats.dislikes + 1,
                };
              default:
                break;
            }

            return {};
          }
        );

        clientVoteDictionary[id] = type;

        await Promise.all([
          setClientVoteDictionaryByIpAddress(
            clientIpAddress,
            clientVoteDictionary
          ),
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
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const config = {
  runtime: 'experimental-edge',
};
