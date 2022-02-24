import { Button, HStack, Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Flickity from 'react-flickity-component';
import { CouponCategory } from '@joroze/cms';
import { useQuery } from 'react-query';
import ROUTES from '../lib/routes';
import Image from 'next/image';

const CategoryCarousel = () => {
  const router = useRouter();
  const { category: activeCategoryName } = router.query;
  const { data: categories = [] } = useQuery<CouponCategory[], Error>(
    '/api/categories'
  );

  return (
    <Box
      width="full"
      sx={{
        '> .flickity-enabled .flickity-viewport': {
          borderRadius: '6px',
        },
      }}
    >
      <Flickity
        options={{
          groupCells: 1,
          draggable: true,
          cellAlign: 'left',
          contain: true,
          prevNextButtons: false,
          pageDots: false,
        }}
      >
        {categories.map((category) => (
          <Button
            mr="5px"
            key={category.sys.id}
            zIndex={'overlay'}
            isActive={
              router.pathname === ROUTES.BRANDS &&
              activeCategoryName === category?.name?.toLowerCase()
            }
          >
            <Link
              shallow
              replace={router.pathname === ROUTES.BRANDS}
              href={`${
                ROUTES.BRANDS
              }?category=${category?.name?.toLowerCase()}`}
              passHref
            >
              <HStack height="100%">
                {category?.image?.url && (
                  <Box width="20px" height="50%" position="relative">
                    <Image
                      draggable={false}
                      src={category?.image?.url}
                      alt={category.name || ''}
                      layout='fill'
                    />
                  </Box>
                )}

                <Text color="gray.600" fontSize="sm" fontWeight="semibold">
                  {category.name}
                </Text>
                <Text color="gray.600" fontSize="sm" fontWeight="normal">
                  {category.linkedFrom?.couponEntityCollection?.items.length}
                </Text>
              </HStack>
            </Link>
          </Button>
        ))}
      </Flickity>
    </Box>
  );
};

export default CategoryCarousel;
