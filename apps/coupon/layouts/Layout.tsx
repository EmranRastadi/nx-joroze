import {
  Flex,
  Container,
  Button,
  HStack,
  Box,
  Text,
  Image,
  VStack,
} from '@chakra-ui/react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import NavLink from '../components/NavLink';
import Flickity from 'react-flickity-component';
import { CouponCategory } from '@joroze/cms';
import { useQuery } from 'react-query';
import ROUTES from '../lib/routes';
import AlertBanner from '../components/AlertBanner';

const Links = [
  {
    name: '🎁 Brands',
    href: ROUTES.BRANDS,
  },
];

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { category: activeCategoryName } = router.query;
  const { data: categories = [] } = useQuery<CouponCategory[], Error>(
    '/api/categories'
  );

  return (
    <>
      <VStack spacing="5">
        <Box width="full">
          <AlertBanner />
          <Nav w="100%">
            {Links.filter(({ name }) => name).map(function (
              { href, name },
              index
            ) {
              return (
                <NavLink key={index} href={href} textAlign="center">
                  {name}
                </NavLink>
              );
            })}
          </Nav>
        </Box>

        <Container
          mt="10px"
          maxW={{
            base: 'none',
            md: 'container.md',
            xl: 'container.xl',
          }}
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
                  replace
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
                          layout="fill"
                        />
                      </Box>
                    )}

                    <Text
                      color="gray.600"
                      fontSize="smaller"
                      fontWeight="semibold"
                    >
                      {category.name}
                    </Text>
                    <Text
                      color="gray.600"
                      fontSize="smaller"
                      fontWeight="normal"
                    >
                      {
                        category.linkedFrom?.couponEntityCollection?.items
                          .length
                      }
                    </Text>
                  </HStack>
                </Link>
              </Button>
            ))}
          </Flickity>
        </Container>

        <Flex as="main" minHeight="calc(100vh - 64px)" width="full">
          <Container
            maxW={{
              base: 'none',
              md: 'container.md',
              xl: 'container.xl',
            }}
          >
            {children}
          </Container>
        </Flex>
      </VStack>
      <Footer />
    </>
  );
};

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Layout;
