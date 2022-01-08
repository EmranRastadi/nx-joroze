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
import { useEffect, useState } from 'react';
import { FaLink, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useMutation } from 'react-query';
import ROUTES from '../lib/routes';
import {
  ReactionPostVariables,
  ReactionPusherChannelName,
  ReactionPusherEventName,
  ReactionPusherEventPayload,
} from '../pages/api/coupons/reactions';

type UseCouponSubscriptionOptions = {
  channelName: ReactionPusherChannelName;
  eventName: ReactionPusherEventName;
  cb: (payload?: ReactionPusherEventPayload) => void;
};

const useCouponSubscription = ({
  channelName,
  eventName,
  cb,
}: UseCouponSubscriptionOptions) =>
  useEvent(useChannel(channelName), eventName, cb);

type Props = {
  coupon: CouponEntry;
  imgSrc?: string;
  likeCount?: number;
  dislikeCount?: number;
  linkClickCount?: number;
};

const postReaction = async (data: ReactionPostVariables) => {
  const response = await (
    await fetch('/api/coupons/reactions', {
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
  likeCount,
  dislikeCount,
  linkClickCount,
  ...rest
}: Props & HTMLChakraProps<'div'>) => {
  const { mutate } = useMutation(postReaction);
  const [likes, setLikes] = useState<number | undefined>();
  const [dislikes, setDislikes] = useState<number | undefined>();
  const [linkClicks, setLinkClicks] = useState<number | undefined>();

  useCouponSubscription({
    channelName: 'coupons',
    eventName: 'reaction',
    cb: ({ couponId, type, count } = {}) => {
      if (couponId !== coupon?.sys?.id) return;

      switch (type) {
        case 'like':
          setLikes(count);
          break;
        case 'dislike':
          setDislikes(count);
          break;
        case 'linkClick':
          setLinkClicks(count);
          break;
        default:
          break;
      }
    },
  });

  useEffect(() => {
    setLikes(likeCount);
    setDislikes(dislikeCount);
    setLinkClicks(linkClickCount);
  }, [likeCount, dislikeCount, linkClickCount]);

  const debouncedMutate = useDebouncedCallback(mutate, 100);

  const handleOnReactionButtonClick =
    (type: ReactionPostVariables['type']) => () =>
      debouncedMutate({ id: coupon.sys.id, type: type });

  return (
    <Card
      gap="6"
      width="full"
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
        <VStack gap={{ base: '2', sm: 0 }} flexGrow={0.75} align="stretch">
          <HStack gap={2} justify={{ base: 'center', sm: 'start' }}>
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
              />
              <Text>{dislikes ? dislikes : '--'}</Text>
            </HStack>
            <HStack>
              <Icon color="purple.600" as={FaLink} />
              <Text>{linkClicks ? linkClicks : '--'}</Text>
            </HStack>
          </HStack>
          <NextLink
            passHref
            href={`${ROUTES.BRANDS}/${coupon?.brandEntity?.slug}/${coupon?.slug}`}
          >
            <Link>
              <Text cursor="pointer" fontSize="larger" fontWeight="extrabold">
                {coupon.title}
              </Text>
            </Link>
          </NextLink>

          <Text fontSize="small" fontWeight="semibold">
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
