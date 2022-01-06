import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '../../..';
import {
  Flex,
  Heading,
  Text,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Box,
} from '@chakra-ui/react';
import { CouponEntry } from '@joroze/cms';
import NextLink from 'next/link';
import ROUTES from '../../../../lib/routes';
import { Card } from '@joroze/ui';

type Props = {
  coupon: CouponEntry;
};

export default function CouponPage({ coupon }: Props) {
  return (
    <Flex direction="column">
      <VStack spacing="4">
        <Breadcrumb mt="2" fontWeight="medium" fontSize="smaller" width="full">
          <BreadcrumbItem>
            <NextLink href={ROUTES.BRANDS} passHref>
              <BreadcrumbLink>Brands</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <NextLink
              href={`${ROUTES.BRANDS}/${coupon?.brandEntity?.slug}`}
              passHref
            >
              <BreadcrumbLink>{coupon?.brandEntity?.name}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray">Coupon</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box width="full">
          <Heading
            size="lg"
            fontWeight="extrabold"
            textAlign={{ base: 'center', xl: 'left' }}
          >
            Promotion {coupon?.brandEntity?.name} - {coupon.title}
          </Heading>
        </Box>

        <Card width="full">
          <Text cursor="pointer" fontWeight="extrabold">
            Information
          </Text>

          <NextLink href={`/api/partner-redirect/${coupon.sys.id}`} passHref>
            <Button rounded="full" colorScheme={'purple'}>
              Open a share
            </Button>
          </NextLink>
        </Card>

        <Card width="full" alignItems="flex-start">
          <Text cursor="pointer" fontWeight="extrabold">
            Coupon description
          </Text>
          <Text>{coupon.description}</Text>
        </Card>
      </VStack>
    </Flex>
  );
}

CouponPage.defaultProps = {
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
  const couponSlug = Array.isArray(params?.couponSlug)
    ? params?.couponSlug[0]
    : params?.couponSlug;

  const { couponEntryCollection } = await fetchFromContentful().Coupons({
    slug: couponSlug,
  });

  const coupon = couponEntryCollection?.items[0];

  if (!coupon) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      coupon,
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
