import {
  Box,
  Flex,
  useDisclosure,
  Button,
  Icon,
  Text,
  ModalBody,
  SkeletonCircle,
  Skeleton,
  Input,
  ModalContent,
  ModalOverlay,
  Modal,
  ListItem,
  List,
  Kbd,
  HStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { CouponEntity } from '@joroze/cms';
import Link from 'next/link';
import { IoReturnDownBack } from 'react-icons/io5';
import ROUTES from '../lib/routes';
import { useQuery } from 'react-query';

const BrandSearchInput = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const {
    data: brands = [],
    isLoading,
    refetch: refetchBrands,
  } = useQuery<CouponEntity[], Error>('/api/brands', {
    enabled: false,
  });
  const [searchValue, setSearchValue] = useState('');
  const filteredBrandOptions = useMemo(
    () =>
      brands.filter((brand) =>
        brand?.name?.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [brands, searchValue]
  );
  const [cursor, setCursor] = useState<number>(0);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // arrow up/down button should select next/previous list element

    if (e.key === 'ArrowUp' && cursor > 0) {
      setCursor((prevCursor) => prevCursor - 1);
    } else if (
      e.key === 'ArrowDown' &&
      cursor < filteredBrandOptions.length - 1
    ) {
      setCursor((prevCursor) => prevCursor + 1);
    } else if (e.key === 'Enter') {
      const activeBrand = filteredBrandOptions[cursor];

      if (!activeBrand) {
        return;
      }

      router.push(`${ROUTES.BRANDS}/${activeBrand.slug}`);
      handleOnBrandOptionClick();
    }
  };

  const handleSearchItemOnMouseEnter = (index: number) => () =>
    setCursor(index);

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const handleOnBrandOptionClick = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen && brands.length === 0) {
      refetchBrands();
    }

    setSearchValue('');
  }, [isOpen, brands, refetchBrands]);

  useEffect(() => {
    setCursor(0);
  }, [filteredBrandOptions]);

  const windowHandleKeyDown = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (event.metaKey && event.key === 'k') {
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }
    },
    [isOpen, onClose, onOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', windowHandleKeyDown);

    // cleanup this event listener
    return () => {
      window.removeEventListener('keydown', windowHandleKeyDown);
    };
  }, [windowHandleKeyDown]);

  return (
    <>
      <Button
        height="43px"
        onClick={onOpen}
        transitionProperty="background-color"
        variant="outline"
        bgColor="gray.100"
        _hover={{ bgColor: 'white' }}
        _active={{ bgColor: 'white' }}
      >
        <Icon mr="10px" as={FaSearch} color="gray.300" />
        <Box width={'full'}>
          <Text mt="2px" color="gray.400" fontWeight="normal" textAlign="left">
            Search brands
          </Text>
        </Box>
        <HStack spacing="1">
          <Kbd fontWeight="normal">⌘</Kbd>
          <Kbd fontWeight="normal">K</Kbd>
        </HStack>
      </Button>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent marginTop="18vh" width={{ base: '70%', md: 'full' }}>
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
              onChange={handleOnInputChange}
              onKeyDown={handleKeyDown}
              width="full"
              height="68px"
              borderColor="transparent"
              _focus={{ borderColor: 'transparent' }}
              _hover={{ borderColor: 'transparent' }}
              pl="68px"
              placeholder="Search brands"
              fontWeight={'medium'}
              outline="transparent solid 2px"
              outlineOffset="2px"
              background="white"
            />
          </Flex>
          <ModalBody padding="0">
            <Flex pl="4" pr="4" flexDir="column">
              <Flex borderTopWidth="1px" pt="2" pb="4" flexDir="column">
                {isLoading && (
                  <Flex flexDir="column">
                    <Flex pl="4" pr="4" pt="2" pb="2" mt="2">
                      <SkeletonCircle size="10" mr="10px" />
                      <Skeleton borderRadius="lg" flexGrow="1" />
                    </Flex>
                    <Flex pl="4" pr="4" pt="2" pb="2" mt="2">
                      <SkeletonCircle size="10" mr="10px" />
                      <Skeleton borderRadius="lg" flexGrow="1" />
                    </Flex>
                  </Flex>
                )}
                {!isLoading && filteredBrandOptions.length === 0 && (
                  <Flex flexDir="column">
                    <Text textAlign="center">No results</Text>
                  </Flex>
                )}
                {!isLoading && filteredBrandOptions.length > 0 && (
                  <List>
                    {filteredBrandOptions.map((brand, index) => {
                      const isActive = cursor === index;

                      return (
                        <Link
                          key={brand?.sys?.id}
                          passHref
                          href={`${ROUTES.BRANDS}/${brand.slug}`}
                        >
                          <ListItem
                            onClick={handleOnBrandOptionClick}
                            onMouseEnter={handleSearchItemOnMouseEnter(index)}
                            role="option"
                            cursor="pointer"
                            bgColor={isActive ? 'gray.100' : 'white'}
                            aria-selected={isActive}
                            display="flex"
                            alignItems="center"
                            minHeight="16"
                            mt="2"
                            pl="4"
                            pr="4"
                            pt="2"
                            pb="2"
                            borderRadius="lg"
                          >
                            <Flex
                              width="50px"
                              height="50px"
                              bgColor="#00000008"
                              border="1px solid #00000008"
                              borderRadius="50%"
                              p="5px"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box
                                width="full"
                                height="full"
                                position="relative"
                              >
                                {brand?.logoImage?.url ? (
                                  <Image
                                    draggable={false}
                                    src={brand.logoImage.url}
                                    alt={`${brand.name} logo`}
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                ) : (
                                  <Flex
                                    flexDir="column"
                                    height="full"
                                    justifyContent="center"
                                  >
                                    <Text textAlign="center">
                                      {brand.name?.[0] || 'N/A'}
                                    </Text>
                                  </Flex>
                                )}
                              </Box>
                            </Flex>

                            <Box flex="1 1 0%" ml="4">
                              <Text fontWeight="semibold">{brand.name}</Text>
                            </Box>

                            <Icon
                              width="20px"
                              height="20px"
                              color="gray.500"
                              as={IoReturnDownBack}
                            />
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>
                )}
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BrandSearchInput;
