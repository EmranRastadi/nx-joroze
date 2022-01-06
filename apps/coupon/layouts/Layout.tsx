import { Flex, Container, Box, VStack } from '@chakra-ui/react';

import { ReactElement } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import NavLink from '../components/NavLink';
import ROUTES from '../lib/routes';
import AlertBanner from '../components/AlertBanner';
import CategoryCarousel from '../components/CategoryCarousel';

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
  return (
    <VStack spacing="7">
      <Box width="full">
        <AlertBanner />
        <Nav>
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
        maxW={{
          base: 'container.sm',
          xl: 'container.xl',
        }}
      >
        <VStack spacing="7" align="stretch">
          <CategoryCarousel />
          <Flex as="main" minHeight="calc(100vh - 64px)" align="stretch">
            {children}
          </Flex>
        </VStack>
      </Container>
      <Footer />
    </VStack>
  );
};

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Layout;
