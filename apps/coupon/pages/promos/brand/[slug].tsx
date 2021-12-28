import { Brand } from '../../../components/BrandSearch';
import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '../..';
import { Text } from '@chakra-ui/react';

type Props = {
  brand: Brand;
};

export default function BrandPage({ brand }: Props) {
  return (
    <div>
      <Text>Brand Page</Text>

      <Text>{brand.name}</Text>
      <Text>{brand.description}</Text>
    </div>
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
