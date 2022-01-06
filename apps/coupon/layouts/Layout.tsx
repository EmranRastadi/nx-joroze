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
          lg: 'container.lg',
        }}
        sx={{
          '> .flickity-enabled .flickity-viewport': {
            borderRadius: '6px',
          },
        }}
      >
        <CategoryCarousel />
      </Container>

      <Flex as="main" minHeight="calc(100vh - 64px)" width="full">
        <Container
          maxW={{
            base: 'none',
            md: 'container.md',
            lg: 'container.lg',
          }}
        >
          {children}
        </Container>
      </Flex>
      <Footer />
    </VStack>
  );
};

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Layout;
