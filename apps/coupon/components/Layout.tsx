import { Flex, Container, Input } from '@chakra-ui/react';
import { ReactElement } from 'react';
import Footer from './Footer';
import Nav from './Nav';
import NavLink from './NavLink';

const Links = [
  {
    name: 'Categories',
    href: '/promos/categories',
  },
];

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
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

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Layout;
