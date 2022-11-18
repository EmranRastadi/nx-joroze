import {
  Link,
  useColorModeValue,
  ThemingProps,
  HTMLChakraProps,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export interface NavLinkProps
  extends HTMLChakraProps<'a'>,
    ThemingProps<'navlink'> {
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, ...rest }) => (
  <NextLink legacyBehavior passHref href={href}>
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      {...rest}
    />
  </NextLink>
);

export default NavLink;
