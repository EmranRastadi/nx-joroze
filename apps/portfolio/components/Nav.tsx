import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export interface NavProps extends HTMLChakraProps<'div'>, ThemingProps<'nav'> {
  title: string;
}

const Nav: React.FC<NavProps> = ({ title, children, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      zIndex="sticky"
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={4}
      {...rest}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>{title}</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {children}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}></Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {children}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Nav;
