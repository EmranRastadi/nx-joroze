import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '../..';
import { Box, Link, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { CouponEntity } from '@joroze/cms';
import Image from 'next/image';
import NextLink from 'next/link';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type Props = {
  brand: CouponEntity;
};

export default function BrandPage({ brand }: Props) {
  return (
    <Flex direction="column">
      <VStack spacing="4">
        <Heading size="lg">
          {brand.name} Promo Codes{' '}
          {new Date().toLocaleString('default', {
            month: 'long',
            day: 'numeric',
          })}
        </Heading>

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
        <Text>{brand.description}</Text>

        {brand.slug === 'coinbase' && (
          <NextLink href="/api/partner-redirect/M9G3h9VD6YFjxFgSEM0Ia" passHref>
            <Link isExternal color="teal.500">
              Sign up here <ExternalLinkIcon mx="2px" />
            </Link>
          </NextLink>
        )}
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
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;

  const { couponEntityCollection } = await fetchFromContentful().Brands({
    slug,
  });

  const brand = couponEntityCollection?.items[0];

  if (!brand) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      brand,
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
    params: { slug: brand?.slug },
  }));

  return { paths, fallback: 'blocking' };
}
