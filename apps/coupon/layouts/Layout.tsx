import { Flex, Container, Box, VStack } from '@chakra-ui/react';

import { ReactElement } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import NavLink from '../components/NavLink';
import ROUTES from '../lib/routes';
import AlertBanner from '../components/AlertBanner';
import CategoryCarousel from '../components/CategoryCarousel';
import Head from 'next/head';

const Links = [
  {
    name: '🎁 Brands',
    href: ROUTES.BRANDS,
  },
];

type Props = {
  children: React.ReactNode;
  metaTags?: Record<string, string>;
};

const Layout = ({ metaTags, children }: Props) => {
  return (
    <>
      <Head>
        {metaTags?.title && <title>{metaTags.title}</title>}
        {metaTags &&
          Object.entries(metaTags).map((entry, index) => {
            return <meta key={index} property={entry[0]} content={entry[1]} />;
          })}
      </Head>
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
    </>
  );
};

export const getLayout = (
  page: ReactElement,
  pageProps: Record<string, unknown>
) => <Layout {...pageProps}>{page}</Layout>;

export default Layout;
