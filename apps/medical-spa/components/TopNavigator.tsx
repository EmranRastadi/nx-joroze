import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { NAV_ROUTES } from '../lib/routes';
import DrawerButton from './DrawerButton';

const TopNavigator = (props) => {
  // const isLarge = useBreakpointValue({ md: true });

  // const { colorMode, toggleColorMode } = useColorMode();
  // const logoutColor = useColorModeValue('teal', 'tomato');
  // const svgFilter = useColorModeValue(null, 'saturate(100)');

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      justifyContent="space-between"
      px="8"
      py="6"
      as="nav"
      boxShadow="xl"
      height="75px"
      width="100%"
      bgGradient="linear(to-r, #20293e, #4a637feb, #20293e)"
      color="white"
      alignItems="center"
    >
      <Link passHref href="/">
        <a>
          <Text fontWeight="bold" fontSize="large">
            Adam Rosenberg PA-C
          </Text>
        </a>
      </Link>
      {isDesktop ? (
        <ButtonGroup variant="link" size="lg" colorScheme="black" spacing="8">
          <Flex
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/adamrosepa/"
          >
            <Button variant="link" color="orange.100" aria-label="linked-in">
              <FaLinkedin />
            </Button>
          </Flex>
          <Flex
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/sculptedbyadam/"
          >
            <Button variant="link" color="orange.100" aria-label="instagram">
              <FaInstagram />
            </Button>
          </Flex>
          {Object.entries(NAV_ROUTES).map(([label, url]) => (
            <Link key={label} href={url}>
              <Button textTransform="capitalize">{label}</Button>
            </Link>
          ))}
        </ButtonGroup>
      ) : (
        <DrawerButton />
      )}
    </Flex>
  );
};

export default TopNavigator;
