import {
  Flex,
  Container,
  Input,
  SimpleGrid,
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
import { CouponCategory } from '../pages/promos/brands';

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
  const isBrandsPath = router.pathname === '/promos/brands';
  const [categories, setCategories] = useState<CouponCategory[]>([]);

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
        <SimpleGrid columns={{ base: 2, sm: 4, md: 6, xl: 6 }} spacing="10px">
          {categories.map((category) => (
            <Link
              shallow
              replace
              key={category.sys.id}
              href={`/promos/brands?category=${category.name.toLowerCase()}`}
              passHref
            >
              <Button
                isActive={
                  isBrandsPath &&
                  activeCategoryName === category?.name?.toLowerCase()
                }
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
            </Link>
          ))}
        </SimpleGrid>
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
