import {
  Box,
  Button,
  ButtonGroup,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Drawer,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
  forwardRef,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import React, { useRef } from 'react';
import Image from 'next/image';
import useSize from '@react-hook/size';

export function Index() {
  const topNavigatorContainerRef = useRef();
  const [, topNavigatorContainerHeight] = useSize(topNavigatorContainerRef);

  return (
    <section>
      <Box boxShadow="sm">
        <TopNavigator ref={topNavigatorContainerRef} />
      </Box>
      <Box
        css={{
          height: [
            `calc(100vh - ${topNavigatorContainerHeight}px)`,
            `calc(100dvh - ${topNavigatorContainerHeight}px)`,
          ],
        }}
        width="100%"
        position="relative"
      >
        <Box padding="8" display="flex" width="100%" height="100%">
          <SimpleGrid
            justifyItems={['center']}
            columns={[1, 1, 2, 2]}
            spacing={8}
          >
            <Box
              borderRadius={['20px', '15px', '10px']}
              width={['100%', '75%', '100%', '100%']}
              height={['70%', '100%', '50%', '50%']}
              overflow="hidden"
              boxShadow="2xl"
            >
              <video
                playsInline
                style={{
                  objectFit: 'cover',
                  height: '100%',
                  minHeight: '100%',
                  width: '100%',
                  minWidth: '100%',
                }}
                autoPlay
                muted
                loop
                id="bgvid"
                preload="auto"
                poster="assets/images/skyline.jpg"
              >
                <source
                  src="assets/videos/faces-preview.webm"
                  type="video/webm"
                />
                <source
                  src="assets/videos/faces-preview.mp4"
                  type="video/mp4"
                />
              </video>
            </Box>
            <Stack
              spacing="5"
              alignSelf={[null, null, 'flex-end']}
              color="white"
            >
              <Heading as="h1">
                Take care of your mind,
                <br /> body and soul.
              </Heading>
              <Text fontWeight="bold" fontSize="medium">
                Familiarize yourself with our world-class BoTox Spa and Studio,
                only available in NYC
              </Text>
              <Box>
                <Link href="#">
                  <Button
                    variant="link"
                    fontWeight="semibold"
                    color="orange.100"
                  >
                    Book your appointment
                  </Button>
                </Link>
              </Box>
            </Stack>
          </SimpleGrid>
        </Box>
      </Box>

      <Box borderTop="1px solid gray" height="100px" position="relative">
        <Image
          layout="fill"
          alt="spa"
          objectFit="cover"
          src="/assets/images/spa.jpg"
        />
      </Box>
    </section>
  );
}

export const TopNavigator = forwardRef((props, ref) => {
  // const isLarge = useBreakpointValue({ md: true });

  // const { colorMode, toggleColorMode } = useColorMode();
  // const logoutColor = useColorModeValue('teal', 'tomato');
  // const svgFilter = useColorModeValue(null, 'saturate(100)');

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      ref={ref}
      justifyContent="space-between"
      px="8"
      py="6"
      as="nav"
      width="100%"
      bgGradient="linear(to-r, #20293e, #4a637feb, #20293e)"
      color="white"
      boxShadow="sm"
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
          <Link passHref href="https://www.linkedin.com/in/adamrosepa/">
            <Box as="a" display="flex">
              <Button color="orange.100" aria-label="linked-in">
                <FaLinkedin />
              </Button>
            </Box>
          </Link>
          {['About', 'Treatments', 'Injectables', 'Location', 'Blog'].map(
            (item) => (
              <Button key={item}>{item}</Button>
            )
          )}
        </ButtonGroup>
      ) : (
        <NavDrawerButton />
      )}
    </Flex>
  );
});

function NavDrawerButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        variant="ghost"
        icon={<FiMenu fontSize="1.25rem" />}
        aria-label="Open Menu"
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <VStack alignItems="flex-start">
              <Link passHref href="https://www.linkedin.com/in/adamrosepa/">
                <Box as="a" display="flex">
                  <Button
                    variant="link"
                    size="lg"
                    minWidth="unset"
                    aria-label="linked-in"
                  >
                    <FaLinkedin />
                  </Button>
                </Box>
              </Link>
              {['About', 'Treatments', 'Injectables', 'Location', 'Blog'].map(
                (item) => (
                  <Button
                    minWidth="unset"
                    variant="link"
                    size="lg"
                    colorScheme="black"
                    key={item}
                  >
                    {item}
                  </Button>
                )
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Index;
