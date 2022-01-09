import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '../../..';
import { Box, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import { CouponEntity, CouponEntry } from '@joroze/cms';
import { motion } from 'framer-motion';
import { getLayout } from '../../../../layouts/BrandLayout';
import CouponCard from '../../../../components/CouponCard';

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
          <Box w="full" key={coupon.sys.id} align="center">
            <motion.div
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <CouponCard
                imgSrc={brand?.logoImage?.url || ''}
                coupon={coupon}
              />
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

  const { couponEntityCollection } = await fetchFromContentful().Brands();

  const brands = couponEntityCollection?.items;
  const brand = brands?.find((brand) => brand?.slug === brandSlug);
  const otherBrandsWithSales = brands?.filter(
    (pBrand) =>
      pBrand?.sys.id !== brand?.sys.id &&
      (pBrand?.linkedFrom?.couponEntryCollection?.total || 0) > 0
  );

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
      brands: otherBrandsWithSales,
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
