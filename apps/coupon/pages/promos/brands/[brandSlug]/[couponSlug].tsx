import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '../../..';
import {
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  Box,
  chakra,
} from '@chakra-ui/react';
import { CouponEntity, CouponEntry } from '@joroze/cms';
import NextLink from 'next/link';
import { Card } from '@joroze/ui';
import { getLayout } from '../../../../layouts/BrandLayout';

type Props = {
  coupon: CouponEntry;
  brand: CouponEntity;
};

export default function CouponPage({ coupon, brand }: Props) {
  return (
    <VStack spacing="4" width="full">
      <Box width="full">
        <Heading
          size="lg"
          fontWeight="extrabold"
          textAlign={{ base: 'center', lg: 'left' }}
        >
          Promotion {brand.name} - {coupon.title}
        </Heading>
      </Box>

      <Card width="full">
        <Text cursor="pointer" fontWeight="extrabold">
          Information
        </Text>

        <NextLink href={`/api/partner-redirect/${coupon.sys.id}`} passHref>
          <chakra.a target="_blank" rel="noopener noreferrer">
            <Button rounded="full" colorScheme={'purple'}>
              Open a share
            </Button>
          </chakra.a>
        </NextLink>
      </Card>

      <Card width="full" alignItems="flex-start">
        <Text cursor="pointer" fontWeight="extrabold">
          Coupon description
        </Text>
        <Text>{coupon.description}</Text>
      </Card>
    </VStack>
  );
}

CouponPage.defaultProps = {
  meta: {
    title: '',
    description: '',
    imgSrc: '',
  },
};

CouponPage.getLayout = getLayout;

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext) => {
  const couponSlug = Array.isArray(params?.couponSlug)
    ? params?.couponSlug[0]
    : params?.couponSlug;

  const { couponEntryCollection } = await fetchFromContentful().Coupons({
    slug: couponSlug,
  });

  const coupon = couponEntryCollection?.items[0];
  const brandId = coupon?.brandEntity?.sys.id;

  if (!coupon || !brandId) {
    return {
      notFound: true,
    };
  }

  const { couponEntity } = await fetchFromContentful().Brand({
    id: brandId,
  });

  if (!couponEntity) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      coupon,
      brand: couponEntity,
      meta: {
        title: coupon.title,
        description: 'Test coupon description',
        imgSrc: coupon?.bannerImagesCollection?.items?.[0]?.url || null,
      },
    },
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const { couponEntryCollection } = await fetchFromContentful().Coupons();
  // Get the paths we want to pre-render based on posts
  const paths = couponEntryCollection?.items.map((coupon) => ({
    params: { couponSlug: coupon?.slug, brandSlug: coupon?.brandEntity?.slug },
  }));

  return { paths, fallback: 'blocking' };
}
