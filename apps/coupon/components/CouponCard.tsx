import {
  Box,
  HTMLChakraProps,
  Text,
  Link,
  VStack,
  Button,
  chakra,
  Stack,
  IconButton,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { useChannel, useEvent } from '@harelpls/use-pusher';
import { CouponEntry } from '@joroze/cms';
import { useDebouncedCallback } from '@joroze/react-utils';
import { Card } from '@joroze/ui';
import Image from 'next/image';
import NextLink from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { FaThumbsDown, FaThumbsUp, FaHandsWash } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ROUTES from '../lib/routes';
import {
  CouponPostVariables,
  CouponPusherChannelName,
  CouponPusherEventType,
  CouponPusherEventPayload,
  CouponStats,
} from '../pages/api/coupons/stats';

type Props = {
  coupon: CouponEntry;
  imgSrc?: string;
};

const postCouponStats = async (data: CouponPostVariables) => {
  const response = await (
    await fetch('/api/coupons/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  ).json();

  return response;
};

const CouponCard = ({
  coupon,
  imgSrc,
  children,
  ...rest
}: Props & HTMLChakraProps<'div'>) => {
  const queryClient = useQueryClient();
  const { data: couponStatsDictionary } = useQuery<
    Record<string, CouponStats>,
    Error
  >('/api/coupons/stats');
  const { mutate } = useMutation(postCouponStats, {
    onSuccess: (data) => {
      queryClient.setQueryData('/api/coupons/stats', data);
    },
  });

  const [couponStats, setCouponStats] = useState<CouponStats | undefined>();
  const { likes, dislikes, linkOpened, lastChosen } = couponStats || {};

  const couponsPusherChannel = useChannel('coupons');
  const couponStatsEventHandler = useCallback(
    (couponStats) =>
      couponStats?.id === coupon?.sys?.id && setCouponStats(couponStats),
    [coupon]
  );

  useEvent<CouponPusherEventPayload>(
    couponsPusherChannel,
    'like' as CouponPusherEventType,
    couponStatsEventHandler
  );
  useEvent<CouponPusherEventPayload>(
    couponsPusherChannel,
    'dislike' as CouponPusherEventType,
    couponStatsEventHandler
  );
  useEvent<CouponPusherEventPayload>(
    couponsPusherChannel,
    'linkClick' as CouponPusherEventType,
    couponStatsEventHandler
  );

  useEffect(() => {
    if (couponStatsDictionary) {
      setCouponStats(couponStatsDictionary[coupon.sys.id]);
    }
  }, [coupon, couponStatsDictionary]);

  const debouncedMutate = useDebouncedCallback(mutate, 100);

  const handleOnReactionButtonClick =
    (type: CouponPostVariables['type']) => () =>
      debouncedMutate({ id: coupon.sys.id, type: type });

  return (
    <Card
      gap="6"
      align="stretch"
      flexDir={{ base: 'column', md: 'row' }}
      {...rest}
    >
      {imgSrc && (
        <NextLink
          passHref
          href={`${ROUTES.BRANDS}/${coupon?.brandEntity?.slug}/${coupon?.slug}`}
        >
          <Link>
            <Box width={{ base: 'full', md: 'initial' }} cursor="pointer">
              <Box
                minWidth="100px"
                minHeight={{ base: '30px', md: '100px' }}
                position="relative"
              >
                <Image
                  objectFit="contain"
                  draggable={false}
                  src={imgSrc}
                  alt="logo"
                  layout="fill"
                />
              </Box>
            </Box>
          </Link>
        </NextLink>
      )}
      <Stack
        direction={{ base: 'column', xl: 'row' }}
        flexGrow={1}
        align="center"
        gap={2}
      >
        <VStack gap={{ base: '2', sm: 0 }} flexGrow={0.75} align="start">
          <HStack gap={2}>
            <HStack>
              <IconButton
                variant="outline"
                colorScheme="green"
                size="sm"
                color="green.400"
                aria-label="Like"
                icon={<FaThumbsUp />}
                onClick={handleOnReactionButtonClick('like')}
                isRound
                isActive={lastChosen === 'like'}
              />
              <Text>{likes ? likes : '--'}</Text>
            </HStack>
            <HStack>
              <IconButton
                variant="outline"
                colorScheme="red"
                color="red.400"
                aria-label="Dislike"
                size="sm"
                onClick={handleOnReactionButtonClick('dislike')}
                icon={<FaThumbsDown />}
                isRound
                isActive={lastChosen === 'dislike'}
              />
              <Text>{dislikes ? dislikes : '--'}</Text>
            </HStack>
            <HStack>
              <Icon fontSize="2xl" color="purple.700" as={FaHandsWash} />
              <Text>{linkOpened ? linkOpened : '--'}</Text>
            </HStack>
          </HStack>
          <NextLink
            passHref
            href={`${ROUTES.BRANDS}/${coupon?.brandEntity?.slug}/${coupon?.slug}`}
          >
            <Link>
              <Text cursor="pointer" fontSize="lg" fontWeight="extrabold">
                {coupon.title}
              </Text>
            </Link>
          </NextLink>

          <Text textAlign={'start'} fontSize="sm" fontWeight="semibold">
            {coupon.description}
          </Text>
        </VStack>

        <NextLink href={`/api/partner-redirect/${coupon.sys.id}`} passHref>
          <chakra.a flexGrow={0.25} target="_blank" rel="noopener noreferrer">
            <Button width="full" rounded="full" colorScheme={'purple'}>
              Open a share
            </Button>
          </chakra.a>
        </NextLink>
      </Stack>
    </Card>
  );
};

export default CouponCard;
