import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import cms, { CouponEntity } from '@joroze/cms';
import { motion } from 'framer-motion';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Flickity from 'react-flickity-component';
import BrandCard from '../components/BrandCard';

export const fetchFromContentful = (preview?: boolean) =>
  cms(
    process.env.CONTENTFUL_GRAPHQL_ENDPOINT as string,
    preview
      ? (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string)
      : (process.env.CONTENTFUL_ACCESS_TOKEN as string)
  );

type Props = {
  brandsWithSales: CouponEntity[];
};

export default function Index({ brandsWithSales }: Props) {
  // const brandCardWidth;
  return (
    <Flex direction="column">
      <VStack>
        <Heading as="h1" mt={2} mb={4}>
          All valid promotional codes on one site
        </Heading>
        <Text fontSize="xl">
          Welcome to the <b>SSHARELY</b> website, which contains the most
          relevant promotions, coupons, discounts and freebets for various
          services! We constantly monitor the Internet so that you can save
          money and receive all kinds of bonuses!
        </Text>
        <Text fontSize="xl">
          With us, you can save and earn money in all spheres of life - from
          bookmakers to food delivery to your home!
        </Text>

        <Box width="full">
          <Flickity
            options={{
              groupCells: 1,
              draggable: true,
              autoPlay: 1500,
              cellAlign: 'left',
              contain: true,
              prevNextButtons: false,
              pageDots: false,
              pauseAutoPlayOnHover: true,
            }}
          >
            {brandsWithSales.map((brand) => (
              <Box key={brand.sys.id}>
                <Link passHref href={`/promos/brands/${brand.slug}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BrandCard cursor="pointer" brand={brand} />
                  </motion.div>
                </Link>
              </Box>
            ))}
          </Flickity>
        </Box>

        <Box padding="25px">
          <Image
            draggable={false}
            src="/people.png"
            alt="people"
            width={290}
            height={290}
          />
        </Box>
      </VStack>
    </Flex>
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
  const { couponEntityCollection } = await fetchFromContentful().Brands();

  const brands = couponEntityCollection?.items;
  const brandsWithSales = brands?.filter(
    (brand) => (brand?.linkedFrom?.couponEntryCollection?.total || 0) > 0
  );

  return {
    props: {
      brandsWithSales,
    },
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
