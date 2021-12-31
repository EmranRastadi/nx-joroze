import {
  Box,
  Flex,
  Icon,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  KeyboardEvent,
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
} from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoReturnDownBack } from 'react-icons/io5';
import { useDebouncedCallback } from '@joroze/react-utils';
import { useRouter } from 'next/router';

export type Brand = {
  sys: {
    id: string;
  };
  description: string;
  name: string;
  slug: string;
  logoImage: {
    url: string;
  };
};

export type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const BrandSearchModal = ({ isOpen, onClose }: Props) => {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const filteredBrandOptions = useMemo(
    () =>
      brands.filter((brand) =>
        brand?.name?.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [brands, searchValue]
  );
  const [cursor, setCursor] = useState<number>(0);
  const [isFetching, setIsFetching] = useState(false);

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

      router.push(`/promos/brands/${activeBrand.slug}`);

      handleOnBrandOptionClick();
    }
  };

  const handleSearchItemOnMouseEnter = (index: number) => () =>
    setCursor(index);

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length && brands.length === 0) {
      fetchBrandsDebounced();
    }
  };

  const handleOnBrandOptionClick = () => {
    onClose();
  };

  const fetchBrands = async () => {
    setIsFetching(true);
    setBrands(await (await fetch('/api/brands')).json());
    setIsFetching(false);
  };

  const fetchBrandsDebounced = useDebouncedCallback(fetchBrands, 300);

  useEffect(() => {
    if (isOpen && brands.length === 0) {
      fetchBrands();
    }

    setSearchValue('');
    setCursor(0);
  }, [isOpen, brands]);

  useEffect(() => {
    setCursor(0);
  }, [filteredBrandOptions]);

  return (
    <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose} size="2xl">
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
              {isFetching && (
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
              {!isFetching && filteredBrandOptions.length === 0 && (
                <Flex flexDir="column">
                  <Text textAlign="center">No results</Text>
                </Flex>
              )}
              {!isFetching && filteredBrandOptions.length > 0 && (
                <List>
                  {filteredBrandOptions.map((brand, index) => {
                    const isActive = cursor === index;

                    return (
                      <Link
                        key={brand?.sys?.id}
                        passHref
                        href={`/promos/brands/${brand.slug}`}
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
                            <Box width="full" height="full" position="relative">
                              {brand?.logoImage?.url ? (
                                <Image
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
                                    {brand.name[0]}
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
  );
};

export default BrandSearchModal;
