import { ReactElement } from 'react';
import Nav from './Nav';
import NavLink from './NavLink';

const Links = [
  {
    name: 'Proceed to joroze.com',
    href: 'https://joroze.com',
  },
];

const Layout = ({ children }) => (
  <>
    <Nav
      title="J"
      position="fixed"
      w="100%"
      bgGradient="linear(to-t, gray.100, white)"
    >
      {Links.filter(({ name }) => name).map(function ({ href, name }, index) {
        return (
          <NavLink key={index} href={href}>
            {name}
          </NavLink>
        );
      })}
    </Nav>
    {children}
  </>
);

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Layout;
