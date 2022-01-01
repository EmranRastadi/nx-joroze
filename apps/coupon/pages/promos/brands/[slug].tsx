import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '../..';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { CouponEntity } from '@joroze/cms';
import Image from 'next/image';

type Props = {
  brand: CouponEntity;
};

export default function BrandPage({ brand }: Props) {
  return (
    <VStack spacing="4">
      <Heading mt="2" size="lg">
        {brand.name} Promo Codes January 2022
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

  console.log(couponEntityCollection?.items);

  return { paths, fallback: 'blocking' };
}
