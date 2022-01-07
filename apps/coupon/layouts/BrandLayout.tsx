import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getLayout as getSiteLayout } from './Layout';

import ROUTES from '../lib/routes';
import { ReactElement } from 'react';
import { CouponEntity } from '@joroze/cms';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card } from '@joroze/ui';
import Image from 'next/image';
import { CheckIcon } from '@chakra-ui/icons';
import BrandCarousel from '../components/BrandCarousel';

type Props = {
  children: React.ReactNode;
  brand?: CouponEntity;
  brands?: CouponEntity[];
};

const BrandLayout = ({ brand, brands, children }: Props) => {
  const router = useRouter();

  return (
    <Stack
      direction={{ base: 'column', xl: 'row' }}
      spacing="5"
      align="stretch"
    >
      <VStack spacing="5" align="stretch" flexGrow={1}>
        <Breadcrumb mt="2" fontWeight="medium" fontSize="smaller">
          <BreadcrumbItem>
            <Link href={ROUTES.BRANDS} passHref>
              <BreadcrumbLink>Brands</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem
            isCurrentPage={router.pathname === '/promos/brands/[brandSlug]'}
            sx={{
              '& > span:first-of-type': {
                color: 'gray',
              },
            }}
          >
            <BreadcrumbLink>
              {router.pathname === '/promos/brands/[brandSlug]' ? (
                brand?.name
              ) : (
                <Link href={`${ROUTES.BRANDS}/${brand?.slug}`} passHref>
                  {brand?.name}
                </Link>
              )}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {router.pathname === '/promos/brands/[brandSlug]/[couponSlug]' && (
            <BreadcrumbItem
              isCurrentPage={
                router.pathname === '/promos/brands/[brandSlug]/[couponSlug]'
              }
              sx={{
                '& > span:first-of-type': {
                  color: 'gray',
                },
              }}
            >
              <BreadcrumbLink>Coupon</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
        {children}

        <Text fontSize="xl" fontWeight="bold">
          Other Brands
        </Text>
        <BrandCarousel brands={brands} />
      </VStack>

      <VStack
        spacing="5"
        width={'full'}
        maxWidth={{ xl: '25%' }}
        align="stretch"
      >
        <Card bgColor="gray.100">
          <VStack align="flex-start">
            <Box mb="2" width="full" height="50px" position="relative">
              {brand?.logoImage?.url && (
                <Image
                  draggable={false}
                  objectFit="contain"
                  src={brand?.logoImage?.url}
                  alt="logo"
                  layout="fill"
                />
              )}
            </Box>
            <Text fontSize="small" color="gray">
              {brand?.brandUrl?.replace('https://', '')}
            </Text>
            <Text fontSize="small" color="gray.700">
              {brand?.description}
            </Text>
          </VStack>
        </Card>
        <Card gap={3}>
          <Text fontSize="lg" fontWeight="bold">
            Why SSHARELY
          </Text>
          <List
            display="flex"
            flexDirection={{ base: 'column', md: 'row', lg: 'column' }}
            alignItems="start"
            fontSize="sm"
            width="full"
            spacing={{ lg: 2 }}
          >
            <ListItem display="flex">
              <ListIcon mt="1" as={CheckIcon} color="purple.500" />
              Working promo codes for {brand?.name}
            </ListItem>
            <ListItem display="flex">
              <ListIcon mt="1" as={CheckIcon} color="purple.500" />
              Lots of promo codes in the category {brand?.category?.name}
            </ListItem>
            <ListItem display="flex">
              <ListIcon mt="1" as={CheckIcon} color="purple.500" />
              Really lucrative bonuses for {brand?.name} and other companies
            </ListItem>
          </List>
        </Card>
      </VStack>
    </Stack>
  );
};

export const getLayout = (
  page: ReactElement,
  pageProps: Record<string, unknown>
) =>
  getSiteLayout(
    // <BrandContextProvider>
    <BrandLayout {...pageProps}>{page}</BrandLayout>
    // </BrandContextProvider>
  );

export default BrandLayout;
