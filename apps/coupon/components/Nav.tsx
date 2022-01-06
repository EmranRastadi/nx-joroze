import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  HTMLChakraProps,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import NextLink from 'next/link';
import BrandSearchInput from './BrandSearchInput';

const Nav = ({ children, ...rest }: HTMLChakraProps<'div'>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      paddingTop="5"
      paddingBottom="5"
      borderBottom="1px solid #d6d8e7"
      {...rest}
    >
      <Container
        maxW={{
          base: 'none',
          md: 'container.md',
          lg: 'container.lg',
        }}
      >
        <Flex justifyContent={'space-between'}>
          <Stack
            width="100%"
            spacing={8}
            justifyContent={{ base: 'center' }}
            alignItems={'center'}
            direction={{ base: 'column', md: 'row' }}
          >
            <NextLink href={'/'}>
              <Flex cursor="pointer">
                <Image
                  priority
                  draggable={false}
                  src="/assets/logo.svg"
                  alt="logo"
                  layout="fixed"
                  width={150}
                  height={60}
                />
              </Flex>
            </NextLink>

            <HStack width={'100%'} as={'nav'} spacing={4} display="flex">
              <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
              />
              <Flex direction="column" grow="1">
                <BrandSearchInput />
              </Flex>
            </HStack>

            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              {children}
            </HStack>

            {isOpen && (
              <Flex width="100%" pb={4} display={{ md: 'none' }}>
                <Stack spacing={4}>{children}</Stack>
              </Flex>
            )}
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
