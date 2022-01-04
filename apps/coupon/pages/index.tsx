import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import cms, { CouponEntity, CouponHeadline } from '@joroze/cms';
import { motion } from 'framer-motion';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Flickity from 'react-flickity-component';
import BrandCard from '../components/BrandCard';
import { BiPurchaseTag, BiBadgeCheck, BiHappy } from 'react-icons/bi';
import ROUTES from '../lib/routes';

export const fetchFromContentful = (preview?: boolean) =>
  cms(
    process.env.CONTENTFUL_GRAPHQL_ENDPOINT as string,
    (preview
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN) as string
  );

type Props = {
  brands: CouponEntity[];
  headlines: CouponHeadline[];
};

export default function Index({ brands, headlines }: Props) {
  return (
    <Flex direction="column">
      <VStack spacing="5">
        <Box
          width="full"
          sx={{
            '> .flickity-enabled .flickity-viewport': {
              borderRadius: '15px',
              transition: 'height 0.2s',
            },
          }}
        >
          <Flickity
            static
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
            {brands.map((brand) => (
              <Box key={brand.sys.id}>
                <Link passHref href={`${ROUTES.BRANDS}/${brand.slug}`}>
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

        <Heading as="h1" mt={2}>
          All valid promo codes on one site
        </Heading>
        <Text>
          Welcome to the{' '}
          <Text as="span" color="purple.500" fontWeight="semibold">
            SSHARELY
          </Text>{' '}
          website, which contains the most relevant promotions, coupons,
          discounts and freebets for various services! We constantly monitor the
          Internet so that you can save money and receive all kinds of bonuses!
          With us, you can save and earn money in all spheres of life - from
          bookmakers to food delivery to your home!
        </Text>

        <List width="full">
          <ListItem>
            <ListIcon as={BiPurchaseTag} color="purple.500" />
            There are 15602 coupons on the site
          </ListItem>
          <ListItem>
            <ListIcon as={BiBadgeCheck} color="purple.500" />
            Only valid promotional codes of companies
          </ListItem>
          <ListItem>
            <ListIcon as={BiHappy} color="purple.500" />
            Promo codes from all walks of life
          </ListItem>
        </List>

        <Box padding="25px">
          <Image
            draggable={false}
            src="/assets/people.png"
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
  const [{ couponEntityCollection }, { couponHeadlineCollection }] =
    await Promise.all([
      fetchFromContentful().Brands(),
      fetchFromContentful().Headlines(),
    ]);

  const brands = couponEntityCollection?.items;
  const brandsWithSales = brands?.filter(
    (brand) => (brand?.linkedFrom?.couponEntryCollection?.total || 0) > 0
  );

  const headlines = couponHeadlineCollection?.items;

  return {
    props: {
      brands: brandsWithSales,
      headlines: headlines,
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
