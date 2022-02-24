import { useUser } from '@auth0/nextjs-auth0';
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
  Tooltip,
} from '@chakra-ui/react';
import { useChannel, useEvent } from '@harelpls/use-pusher';
import { CouponEntry } from '@joroze/cms';
import { useDebouncedCallback } from '@joroze/react-utils';
import { Card } from '@joroze/ui';
import Image from 'next/image';
import NextLink from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {
  FaThumbsDown,
  FaThumbsUp,
  FaHandsWash,
  FaTrashAlt,
} from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ROUTES from '../lib/routes';
import {
  CouponPostVariables,
  CouponPusherEventType,
  CouponPusherEventPayload,
  CouponStats,
} from '../pages/api/coupons/stats';

type Props = {
  coupon: CouponEntry;
  imgSrc?: string;
  carouselView?: boolean;
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

const postCouponStatsDelete = async (data: CouponPostVariables) => {
  const response = await (
    await fetch('/api/coupons/stats/clear', {
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
  carouselView,
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
  const { mutate: mutateDelete } = useMutation(postCouponStatsDelete, {
    onSuccess: (data) => {
      queryClient.setQueryData('/api/coupons/stats', data);
    },
  });

  const { user } = useUser();

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
  useEvent<CouponPusherEventPayload>(
    couponsPusherChannel,
    'clear' as CouponPusherEventType,
    couponStatsEventHandler
  );

  useEffect(() => {
    if (couponStatsDictionary) {
      setCouponStats(couponStatsDictionary[coupon.sys.id]);
    }
  }, [coupon, couponStatsDictionary]);

  const debouncedMutate = useDebouncedCallback(mutate, 100);
  const debouncedMutateDelete = useDebouncedCallback(mutateDelete, 100);

  const handleOnReactionButtonClick =
    (type: CouponPostVariables['type']) => () => {
      switch (type) {
        case lastChosen:
          break;
        case 'clear':
          debouncedMutateDelete({ id: coupon.sys.id, type: type });
          break;
        default:
          debouncedMutate({ id: coupon.sys.id, type: type });
          break;
      }
    };

  return (
    <Card
      gap="6"
      align="stretch"
      flexDir={carouselView ? 'column' : { base: 'column', xl: 'row' }}
      textAlign="start"
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
                minHeight={{ base: '30px' }}
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
        direction={carouselView ? 'column' : { base: 'column', xl: 'row' }}
        flexGrow={1}
        align="center"
        spacing={4}
      >
        <VStack spacing={{ base: 6, sm: 4 }} flexGrow={0.75} align="start">
          <HStack spacing={3}>
            <HStack>
              <Tooltip label="Like">
                <IconButton
                  variant="outline"
                  colorScheme="green"
                  size="xs"
                  color="green.400"
                  aria-label="Like"
                  icon={<FaThumbsUp />}
                  onClick={handleOnReactionButtonClick('like')}
                  isRound
                  isActive={lastChosen === 'like'}
                />
              </Tooltip>
              <Text fontSize="md">{likes ? likes : 0}</Text>
            </HStack>
            <HStack>
              <Tooltip label="Dislike">
                <IconButton
                  variant="outline"
                  colorScheme="red"
                  color="red.400"
                  aria-label="Dislike"
                  size="xs"
                  onClick={handleOnReactionButtonClick('dislike')}
                  icon={<FaThumbsDown />}
                  isRound
                  isActive={lastChosen === 'dislike'}
                />
              </Tooltip>
              <Text fontSize="md">{dislikes ? dislikes : 0}</Text>
            </HStack>
            <Tooltip label="Recent users">
              <HStack>
                <Icon fontSize="lg" color="purple.700" as={FaHandsWash} />
                <Text fontSize="md">{linkOpened ? linkOpened : 0}</Text>
              </HStack>
            </Tooltip>
            {user && (
              <Tooltip label="Clear">
                <IconButton
                  variant="outline"
                  colorScheme="blackAlpha"
                  size="xs"
                  aria-label="Clear"
                  icon={<FaTrashAlt />}
                  onClick={handleOnReactionButtonClick('clear')}
                  isRound
                  disabled={!likes && !dislikes}
                />
              </Tooltip>
            )}
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

          <Text noOfLines={3} fontSize="sm" fontWeight="semibold">
            {coupon.description}
          </Text>
          {coupon.staffPick && (
            <Text color="green" fontWeight="semibold" fontSize="xs">
              {"Editor's Pick"}
            </Text>
          )}
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
