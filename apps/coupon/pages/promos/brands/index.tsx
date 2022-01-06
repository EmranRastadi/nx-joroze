import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '../..';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { CouponEntity } from '@joroze/cms';
import BrandCard from '../../../components/BrandCard';
import ROUTES from '../../../lib/routes';

export type CouponCategory = {
  sys: {
    id: string;
  };
  image: {
    url: string;
  };
  linkedFrom: {
    couponEntityCollection: {
      items: {
        sys: {
          id: string;
        };
        name: string;
        slug: string;
      }[];
    };
  };
  name: string;
};

export const AlphabetLetters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
] as const;

const AlphabetLetterDictionary = AlphabetLetters.reduce<
  Record<string, boolean>
>((acc, alphabetLetter) => {
  acc[alphabetLetter] = true;
  return acc;
}, {});

export type AlphabetLetter = typeof AlphabetLetters[number];

type Props = {
  preview: boolean;
  brands: CouponEntity[];
};

export default function BrandsPage({ preview, brands }: Props) {
  const router = useRouter();
  const { category: activeCategoryName } = router.query;
  const [selectedAlphabetLetter, setSelectedAlphabetLetter] = useState<
    AlphabetLetter | ''
  >('');

  const handleOnShowAllBrandsButtonClick = () => {
    setSelectedAlphabetLetter('');
    router.replace(ROUTES.BRANDS);
  };
  const handleOnAlphabetLetterButtonClick =
    (alphabetLetter: AlphabetLetter) => () =>
      setSelectedAlphabetLetter(alphabetLetter);

  const filteredBrandsByCategory = useMemo(
    () =>
      activeCategoryName
        ? brands.filter(
            (brand) =>
              brand.category?.name?.toLowerCase() === activeCategoryName
          )
        : brands,
    [brands, activeCategoryName]
  );

  const filteredBrands = useMemo(
    () =>
      selectedAlphabetLetter
        ? filteredBrandsByCategory.filter(
            (brand) =>
              brand?.name?.[0]?.toLowerCase() === selectedAlphabetLetter
          )
        : filteredBrandsByCategory,
    [filteredBrandsByCategory, selectedAlphabetLetter]
  );

  const filteredAlphabetLetters = useMemo(
    () =>
      Object.keys(
        filteredBrandsByCategory.reduce<Record<AlphabetLetter, boolean>>(
          (acc, brand) => {
            const brandNameFirstLetter = brand?.name?.[0]?.toLowerCase();

            if (
              !brandNameFirstLetter ||
              !(brandNameFirstLetter in AlphabetLetterDictionary)
            ) {
              return acc;
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            acc[brandNameFirstLetter] = true;

            return acc;
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          {}
        )
      ),
    [filteredBrandsByCategory]
  );

  useEffect(() => {
    setSelectedAlphabetLetter('');
  }, [activeCategoryName]);

  return (
    <VStack align="stretch" w="full" spacing={6}>
      <Heading as="h1" textTransform="capitalize">
        {activeCategoryName} Promo Codes
      </Heading>

      <HStack spacing={6}>
        <Heading as="h2" size="md">
          All brands
        </Heading>

        {(activeCategoryName || selectedAlphabetLetter) && (
          <Button
            onClick={handleOnShowAllBrandsButtonClick}
            fontSize="sm"
            variant="link"
          >
            Show All
          </Button>
        )}
      </HStack>

      <Flex gap="2" flexWrap="wrap">
        {filteredAlphabetLetters.map((alphabetLetter) => {
          return (
            <Button
              isActive={selectedAlphabetLetter === alphabetLetter}
              onClick={handleOnAlphabetLetterButtonClick(
                alphabetLetter as AlphabetLetter
              )}
              variant="ghost"
              key={alphabetLetter}
            >
              <Text color="gray.600" textTransform="capitalize">
                {alphabetLetter}
              </Text>
            </Button>
          );
        })}
      </Flex>

      <VStack>
        <SimpleGrid columns={{ base: 3, md: 4, xl: 8 }} spacing="30px">
          {filteredBrands.map((brand) => (
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
        </SimpleGrid>
      </VStack>
    </VStack>
  );
}

BrandsPage.defaultProps = {
  meta: {
    title: 'Promo Brands',
    description: '',
    imgSrc: '',
  },
};

export const getStaticProps = async ({
  preview = false,
}: GetStaticPropsContext) => {
  const { couponEntityCollection } = await fetchFromContentful().Brands();

  const brands = couponEntityCollection?.items;

  return {
    props: {
      preview,
      brands,
    },
  };
};
