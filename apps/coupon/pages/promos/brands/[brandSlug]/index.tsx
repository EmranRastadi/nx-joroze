import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '../../..';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  chakra,
  Link,
  Flex,
} from '@chakra-ui/react';
import { CouponEntity, CouponEntry } from '@joroze/cms';
import Image from 'next/image';
import NextLink from 'next/link';
import ROUTES from '../../../../lib/routes';
import { Card } from '@joroze/ui';
import { motion } from 'framer-motion';
import { getLayout } from '../../../../layouts/BrandLayout';

type Props = {
  brand: CouponEntity;
  coupons: CouponEntry[];
};

export default function BrandPage({ brand, coupons }: Props) {
  return (
    <VStack spacing="7" width="full">
      <VStack spacing="4" width="full" align="flex-start">
        <Heading size="lg">
          {brand.name} promo codes{' '}
          {new Date().toLocaleString('default', {
            month: 'long',
            day: 'numeric',
          })}
        </Heading>

        <Text fontWeight="medium">{brand.headline}</Text>

        {!coupons.length && (
          <Flex
            justifyContent="center"
            width="full"
            bg="blue.600"
            padding={5}
            rounded="base"
          >
            <Text color="white" fontSize="xl" fontWeight="semibold">
              Sorry, the coupons of this brand have run out.
            </Text>
          </Flex>
        )}
      </VStack>

      {coupons.map((coupon) => {
        return (
          <Box w="full" key={coupon.sys.id}>
            <motion.div
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Card
                gap={{ base: '0', md: '5' }}
                width="full"
                flexDir={{ base: 'column', md: 'row' }}
              >
                <NextLink
                  passHref
                  href={`${ROUTES.BRANDS}/${coupon?.brandEntity?.slug}/${coupon?.slug}`}
                >
                  <Link>
                    <Box
                      width={{ base: 'full', md: 'initial' }}
                      cursor="pointer"
                    >
                      <Box
                        minWidth="100px"
                        minHeight={{ base: '30px', md: '100px' }}
                        position="relative"
                      >
                        <Image
                          draggable={false}
                          src="/assets/logo.svg"
                          alt="logo"
                          layout="fill"
                        />
                      </Box>
                    </Box>
                  </Link>
                </NextLink>
                <VStack flexGrow={1} align="flex-start">
                  <NextLink
                    passHref
                    href={`${ROUTES.BRANDS}/${coupon?.brandEntity?.slug}/${coupon?.slug}`}
                  >
                    <Link>
                      <Text
                        cursor="pointer"
                        fontSize="larger"
                        fontWeight="extrabold"
                      >
                        {coupon.title}
                      </Text>
                    </Link>
                  </NextLink>

                  <Text fontSize="small" fontWeight="semibold">
                    {coupon.description}
                  </Text>

                  <NextLink
                    href={`/api/partner-redirect/${coupon.sys.id}`}
                    passHref
                  >
                    <chakra.a
                      w="full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button w="full" rounded="full" colorScheme={'purple'}>
                        Open a share
                      </Button>
                    </chakra.a>
                  </NextLink>
                </VStack>
              </Card>
            </motion.div>
          </Box>
        );
      })}
    </VStack>
  );
}

BrandPage.defaultProps = {
  meta: {
    title: '',
    description: '',
    imgSrc: '',
  },
};

BrandPage.getLayout = getLayout;

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext) => {
  const brandSlug = Array.isArray(params?.brandSlug)
    ? params?.brandSlug[0]
    : params?.brandSlug;

  const { couponEntityCollection } = await fetchFromContentful().Brands({
    slug: brandSlug,
  });

  const brand = couponEntityCollection?.items[0];

  if (!brand) {
    return {
      notFound: true,
    };
  }

  const { couponEntryCollection } = await fetchFromContentful().Coupons({
    brandId: brand?.sys?.id,
    active: true,
  });

  const coupons = couponEntryCollection?.items;

  return {
    props: {
      preview,
      brand,
      coupons,
      meta: {
        title: brand.name,
        description: 'Test brand name',
        imgSrc: brand?.logoImage?.url,
      },
    },
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const { couponEntityCollection } = await fetchFromContentful().Brands();
  // Get the paths we want to pre-render based on posts
  const paths = couponEntityCollection?.items.map((brand) => ({
    params: { brandSlug: brand?.slug },
  }));

  return { paths, fallback: 'blocking' };
}
