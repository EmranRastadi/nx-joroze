import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '../../..';
import {
  Box,
  Link,
  Flex,
  Heading,
  Text,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  chakra,
} from '@chakra-ui/react';
import { CouponEntity, CouponEntry } from '@joroze/cms';
import Image from 'next/image';
import NextLink from 'next/link';
import ROUTES from '../../../../lib/routes';
import { Card } from '@joroze/ui';
import { motion } from 'framer-motion';

type Props = {
  brand: CouponEntity;
  coupons: CouponEntry[];
};

export default function BrandPage({ brand, coupons }: Props) {
  console.log('coupons: ', coupons);

  return (
    <Flex direction="column">
      <VStack spacing="4">
        <Breadcrumb mt="2" fontWeight="medium" fontSize="smaller" width="full">
          <BreadcrumbItem>
            <NextLink href={ROUTES.BRANDS} passHref>
              <BreadcrumbLink>Brands</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray">{brand?.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <VStack spacing="4" width="full" align="flex-start">
          <Heading size="lg">
            {brand.name} promo codes{' '}
            {new Date().toLocaleString('default', {
              month: 'long',
              day: 'numeric',
            })}
          </Heading>

          <Text fontWeight="medium">{brand.headline}</Text>
        </VStack>

        {brand?.logoImage?.url && (
          <Box>
            <Image
              draggable={false}
              src={brand.logoImage.url}
              alt={`${brand.name} logo`}
              objectFit="contain"
              width={'80px'}
              height={'20px'}
            />
          </Box>
        )}

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
                  <Box minWidth="100px" minHeight="30px" position="relative">
                    <Image src="/assets/logo.svg" alt="logo" layout="fill" />
                  </Box>
                  <VStack align="flex-start">
                    <NextLink
                      passHref
                      href={`${ROUTES.BRANDS}/${coupon?.brandEntity?.slug}/${coupon?.slug}`}
                    >
                      <Text
                        cursor="pointer"
                        fontSize="larger"
                        fontWeight="extrabold"
                      >
                        {coupon.title}
                      </Text>
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

        <Text>{brand.description}</Text>
      </VStack>
    </Flex>
  );
}

BrandPage.defaultProps = {
  meta: {
    title: '',
    description: '',
    imgSrc: '',
  },
};

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
