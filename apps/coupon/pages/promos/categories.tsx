import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Brand } from '../../components/BrandSearch';
import { GetStaticPropsContext } from 'next';
import { fetchFromContentful } from '..';
import { useState } from 'react';
import { Card } from '@joroze/ui';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

type Props = {
  preview: boolean;
  categories: CouponCategory[];
};

export default function CategoryPage({ preview, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<CouponCategory>(
    categories[0]
  );
  const handleOnCategoryClick = (category: CouponCategory) => () =>
    setActiveCategory(category);

  return (
    <div>
      <VStack align="flex-start">
        <Heading as="h1" mt={4} mb={4}>
          {activeCategory?.name} Promo Codes
        </Heading>
        <Heading as="h2" size="md">
          All brands
        </Heading>

        <SimpleGrid columns={{ base: 2, sm: 4, md: 6, xl: 6 }} spacing="10px">
          {categories.map((category) => (
            <Button
              isActive={category.sys.id === activeCategory.sys.id}
              onClick={handleOnCategoryClick(category)}
              key={category.sys.id}
            >
              <HStack height="100%">
                <Box width="20px" height="50%" position="relative">
                  <Image
                    src={category?.image?.url}
                    alt={category.name}
                    layout="fill"
                  />
                </Box>

                <Text>{category.name}</Text>
              </HStack>
            </Button>
          ))}
        </SimpleGrid>

        {activeCategory && (
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, xl: 6 }} spacing="40px">
            {activeCategory.linkedFrom.couponEntityCollection.items.map(
              (brand) => (
                <motion.div
                  key={brand.sys.id}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link passHref href={`/promos/brand/${brand.slug}`}>
                    <Card cursor="pointer" borderRadius={'15px'}>
                      <VStack>
                        <Text>{`${brand.name}`}</Text>
                        <Text>{`THIS IS A ${activeCategory.name}`}</Text>
                      </VStack>
                    </Card>
                  </Link>
                </motion.div>
              )
            )}

            {/* {new Array(50).fill(0).map((_, index) => (
              <Card borderRadius={'15px'} key={index}>
                <VStack>
                  <Text>{`THIS IS A ${activeCategory.name}`}</Text>
                  <Text>{`THIS IS A ${activeCategory.name}`}</Text>
                </VStack>
              </Card>
            ))} */}
          </SimpleGrid>
        )}
      </VStack>
    </div>
  );
}

CategoryPage.defaultProps = {
  meta: {
    title: 'Promo Categories',
    description: '',
    imgSrc: '',
  },
};

export const getStaticProps = async ({
  preview = false,
}: GetStaticPropsContext) => {
  const { couponCategoryCollection } = await fetchFromContentful().Categories({
    preview: !!preview,
  });

  const categories = couponCategoryCollection?.items;

  return {
    props: {
      preview,
      categories,
    },
  };
};
