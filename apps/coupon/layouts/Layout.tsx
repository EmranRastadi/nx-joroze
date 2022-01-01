import {
  Flex,
  Container,
  Button,
  HStack,
  Box,
  Text,
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import NavLink from '../components/NavLink';
import Flickity from 'react-flickity-component';
import { CouponCategory } from '@joroze/cms';

const Links = [
  {
    name: '🎁 Brands',
    href: '/promos/brands',
  },
];

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { category: activeCategoryName } = router.query;
  const [categories, setCategories] = useState<CouponCategory[]>([]);
  const isBrandsPath = router.pathname === '/promos/brands';

  useEffect(() => {
    (async () => {
      setCategories(await (await fetch('/api/categories')).json());
    })();
  }, []);

  return (
    <>
      <Nav w="100%">
        {Links.filter(({ name }) => name).map(function ({ href, name }, index) {
          return (
            <NavLink key={index} href={href} textAlign="center">
              {name}
            </NavLink>
          );
        })}
      </Nav>

      <Container
        mt="10px"
        maxW={{
          base: 'none',
          md: 'container.md',
          xl: 'container.xl',
        }}
      >
        <Flickity
          options={{
            groupCells: 1,
            draggable: true,
            // autoPlay: 1000,
            // wrapAround: true,
            cellAlign: 'left',
            contain: true,
            prevNextButtons: false,
            pageDots: false,
            // pauseAutoPlayOnHover: true,
          }}
        >
          {categories.map((category) => (
            <Button
              mr="5px"
              key={category.sys.id}
              zIndex={'overlay'}
              isActive={
                isBrandsPath &&
                activeCategoryName === category?.name?.toLowerCase()
              }
            >
              <Link
                shallow
                replace
                href={`/promos/brands?category=${category?.name?.toLowerCase()}`}
                passHref
              >
                <HStack height="100%">
                  {category?.image?.url && (
                    <Box width="20px" height="50%" position="relative">
                      <Image
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
                  <Text color="gray.600" fontSize="smaller" fontWeight="normal">
                    {category.linkedFrom?.couponEntityCollection?.items.length}
                  </Text>
                </HStack>
              </Link>
            </Button>
          ))}
        </Flickity>
      </Container>

      <Flex as="main" minHeight="calc(100vh - 64px)">
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
      <Footer />
    </>
  );
};

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Layout;
