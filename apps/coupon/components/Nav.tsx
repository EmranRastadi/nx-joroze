import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  HTMLChakraProps,
  Container,
  Button,
  Icon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  ListItem,
  List,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import NextLink from 'next/link';
import BrandSearchInput from './BrandSearch';
import { FaSearch } from 'react-icons/fa';
import { IoReturnDownBack } from 'react-icons/io5';
import Link from 'next/link';

const Nav = ({ children, ...rest }: HTMLChakraProps<'div'>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <Box
      as="header"
      paddingTop="10px"
      paddingBottom="10px"
      borderBottom="1px solid #d6d8e7"
      {...rest}
    >
      <Container
        maxW={{
          base: 'none',
          md: 'container.md',
          xl: 'container.xl',
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
                  src="/logo.svg"
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
                <Button
                  height="43px"
                  onClick={onModalOpen}
                  variant="outline"
                  _hover={{ bgColor: 'white' }}
                  _active={{ bgColor: 'white' }}
                  transition="none"
                >
                  <Icon mr="10px" as={FaSearch} color="gray.300" />
                  <Box width={'full'}>
                    <Text color="gray.400" fontWeight="normal" textAlign="left">
                      Search for a company
                    </Text>
                  </Box>
                </Button>
                <Modal isOpen={isModalOpen} onClose={onModalClose} size="2xl">
                  <ModalOverlay />
                  <ModalContent>
                    <Flex alignItems="stretch" position="relative">
                      <Icon
                        as={FaSearch}
                        zIndex="modal"
                        color="purple.500"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="absolute"
                        left="7"
                        height="68px"
                      />
                      <Input
                        width="full"
                        height="68px"
                        borderColor="transparent"
                        _focus={{ borderColor: 'transparent' }}
                        _hover={{ borderColor: 'transparent' }}
                        pl="68px"
                        placeholder="Search the docs"
                        fontWeight={'medium'}
                        outline="transparent solid 2px"
                        outlineOffset="2px"
                        background="white"
                      />
                    </Flex>
                    <ModalBody>
                      <Flex flexDir="column">
                        <List borderTopWidth="1px" pt="2" pb="4">
                          <Link passHref href={`/`}>
                            <ListItem
                              role="option"
                              aria-selected={true}
                              display="flex"
                              alignItems="center"
                              minHeight="16"
                              mt="2"
                              pl="4"
                              pr="4"
                              pt="2"
                              pb="2"
                              borderRadius="lg"
                              bg="gray.100"
                            >
                              <Box
                                position="relative"
                                width="20px"
                                height="20px"
                              >
                                <Image src="/logo" alt="logo" layout="fill" />
                              </Box>
                              <Box flex="1 1 0%" ml="4">
                                <Text fontWeight="semibold">Hello</Text>
                              </Box>
                              <Icon
                                width="20px"
                                height="20px"
                                as={IoReturnDownBack}
                              />
                            </ListItem>
                          </Link>
                          <ListItem>Hello</ListItem>

                          <ListItem>Hello</ListItem>
                        </List>
                      </Flex>
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <BrandSearchInput />
              </Flex>
            </HStack>

            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              {children}
            </HStack>

            {isOpen ? (
              <Flex width="100%" pb={4} display={{ md: 'none' }}>
                <Stack spacing={4}>{children}</Stack>
              </Flex>
            ) : null}
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
