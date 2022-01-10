import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import cms, { CouponEntity, CouponEntry, CouponHeadline } from '@joroze/cms';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Flickity from 'react-flickity-component';
import { BiPurchaseTag, BiBadgeCheck, BiHappy } from 'react-icons/bi';
import ROUTES from '../lib/routes';
import BrandCarousel from '../components/BrandCarousel';
import CouponCarousel from '../components/CouponCarousel';
import { CouponStats, getCouponStatsDictionary } from './api/coupons/stats';

const MAX_COUPON_STATS_ITEMS = 10;

export const fetchFromContentful = (preview?: boolean) =>
  cms(
    process.env.CONTENTFUL_GRAPHQL_ENDPOINT as string,
    (preview
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN) as string
  );

type Props = {
  couponsMostPopular: CouponEntry[];
  brands: CouponEntity[];
  headlines: CouponHeadline[];
};

export default function Index({
  couponsMostPopular,
  brands,
  headlines,
}: Props) {
  return (
    <VStack align="stretch" spacing="7">
      <Box
        mt={3}
        sx={{
          '> .flickity-enabled .flickity-viewport': {
            borderRadius: '15px',
            transition: 'height 0.2s',
          },
        }}
      >
        <Flickity
          options={{
            adaptiveHeight: true,
            groupCells: 1,
            draggable: true,
            autoPlay: 5000,
            cellAlign: 'left',
            contain: true,
            prevNextButtons: false,
            pageDots: false,
            pauseAutoPlayOnHover: true,
          }}
        >
          {headlines.map((headline) =>
            headline.url ? (
              <Link key={headline.sys.id} passHref href={headline.url}>
                <Box
                  marginRight={2}
                  cursor="pointer"
                  borderRadius="15px"
                  overflow="hidden"
                  width="full"
                >
                  {headline?.image?.url ? (
                    <Image
                      priority
                      objectFit="cover"
                      layout="responsive"
                      width={700}
                      height={200}
                      alt="headline image"
                      src={headline?.image?.url}
                    />
                  ) : (
                    <Box
                      padding="2"
                      border="1px solid"
                      borderRadius="15px"
                      borderColor="purple.500"
                      height="full"
                    >
                      <VStack spacing="2">
                        <Heading>{headline.title}</Heading>
                        <Text>{headline.description}</Text>
                      </VStack>
                    </Box>
                  )}
                </Box>
              </Link>
            ) : (
              <Box
                marginRight={2}
                borderRadius="15px"
                overflow="hidden"
                width="full"
              >
                {headline?.image?.url ? (
                  <Image
                    priority
                    objectFit="cover"
                    layout="responsive"
                    width={700}
                    height={200}
                    alt="headline image"
                    src={headline?.image?.url}
                  />
                ) : (
                  <Box
                    padding="2"
                    border="1px solid"
                    borderRadius="15px"
                    borderColor="purple.500"
                    height="full"
                  >
                    <VStack spacing="2">
                      <Heading>{headline.title}</Heading>
                      <Text>{headline.description}</Text>
                    </VStack>
                  </Box>
                )}
              </Box>
            )
          )}
        </Flickity>
      </Box>
      <Box>
        <VStack width="full" gap={4} mt={10} mb="20">
          <BrandCarousel brands={brands} />
          <Link href={ROUTES.BRANDS} passHref>
            <Button
              colorScheme="purple"
              width="250px"
              borderRadius="full"
              borderWidth="2px"
              size="lg"
              variant="outline"
              fontWeight="extrabold"
            >
              All brands
            </Button>
          </Link>
        </VStack>
      </Box>

      <VStack align="start">
        <Text fontSize="3xl" fontWeight="bold">
          Most popular 🔥
        </Text>
        <CouponCarousel coupons={couponsMostPopular} />
      </VStack>
      <Stack
        spacing="10"
        direction={{ base: 'column', xl: 'row' }}
        align="stretch"
      >
        <VStack align="stretch" spacing="7">
          <Text fontSize="3xl" fontWeight="bold">
            All valid promo codes on one site
          </Text>
          <Text>
            Welcome to the{' '}
            <Text
              bgClip="text"
              bgGradient="linear(to-l, purple.700, purple.800, purple.900)"
              as="span"
              fontWeight="bold"
            >
              SSHARELY
            </Text>{' '}
            website, which contains the most relevant promotions, coupons,
            discounts and freebets for various services! We constantly monitor
            the Internet so that you can save money and receive all kinds of
            bonuses! With us, you can save and earn money in all spheres of life
            - from bookmakers to food delivery to your home!
          </Text>

          <List spacing={3} width="full">
            <ListItem>
              <ListIcon as={BiPurchaseTag} color="purple.700" />
              There are 15602 coupons on the site
            </ListItem>
            <ListItem>
              <ListIcon as={BiBadgeCheck} color="purple.700" />
              Only valid promotional codes of companies
            </ListItem>
            <ListItem>
              <ListIcon as={BiHappy} color="purple.700" />
              Promo codes from all walks of life
            </ListItem>
          </List>
        </VStack>
        <Flex justify="center">
          <Box
            opacity={{ base: '0.75', xl: '1' }}
            width={{ base: '50%', xl: '100%' }}
          >
            <Image
              draggable={false}
              src="/assets/gifts.svg"
              alt="people"
              objectFit="contain"
              width="1000px"
              height="700px"
            />
          </Box>
        </Flex>
      </Stack>
    </VStack>
  );
}

Index.defaultProps = {
  meta: {
    title: 'Dunks',
    description: 'Nike x Off White | The 50',
    imgSrc: '',
  },
};

export const getStaticProps = async ({ preview }: GetStaticPropsContext) => {
  const [
    couponStatsDictionary,
    { couponEntryCollection },
    { couponEntityCollection },
    { couponHeadlineCollection },
  ] = await Promise.all([
    getCouponStatsDictionary(),
    fetchFromContentful().Coupons(),
    fetchFromContentful().Brands(),
    fetchFromContentful().Headlines(),
  ]);

  const couponsMostPopular = couponEntryCollection?.items
    ?.filter((coupon) => {
      const couponId = coupon?.sys.id;

      if (!couponId) return false;

      const couponStats = couponStatsDictionary[couponId];

      return couponStats?.likes > 0;
    })
    .sort((couponA, couponB) => {
      const couponIdA = couponA?.sys.id;
      const couponIdB = couponB?.sys.id;

      return (
        (couponStatsDictionary[couponIdB || '']?.likes || 0) -
        (couponStatsDictionary[couponIdA || '']?.likes || 0)
      );
    })
    .slice(0, MAX_COUPON_STATS_ITEMS);

  const brands = couponEntityCollection?.items;
  const brandsWithSales = brands?.filter(
    (brand) => (brand?.linkedFrom?.couponEntryCollection?.total || 0) > 0
  );

  const headlines = couponHeadlineCollection?.items;

  return {
    props: {
      couponsMostPopular: couponsMostPopular,
      brands: brandsWithSales,
      headlines: headlines,
    },
    revalidate: 10, // In seconds
  };
};

// {preview ? (
//   <>
//     This is page is a preview.{' '}
//     <a
//       href="/api/exit-preview"
//       className="underline hover:text-cyan duration-200 transition-colors"
//     >
//       Click here
//     </a>{' '}
//     to exit preview mode.
//   </>
