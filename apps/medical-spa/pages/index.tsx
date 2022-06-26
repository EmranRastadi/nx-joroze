import {
  Box,
  Button,
  ButtonGroup,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
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
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';

export function Index() {
  return (
    <section>
      <TopNavigator />
      <Box
        css={{ height: ['100dvh', '100vh'] }}
        width="100%"
        position="relative"
      >
        <Box padding="8" display="flex" width="100%" height="100%">
          <Stack spacing="5" alignSelf="flex-end" color="white">
            <Heading as="h1">
              Take care of your mind,
              <br /> body and soul.
            </Heading>
            <Text fontSize="medium">
              Familiarize yourself with our world-class BoTox Spa and Studio,
              only available in NYC
            </Text>
            <Link href="#">
              <Text fontWeight="semibold" color="orange.100">
                Book an appointment
              </Text>
            </Link>
          </Stack>
        </Box>

        <video
          playsInline
          style={{
            zIndex: -2,
            top: 0,
            position: 'absolute',
            filter: 'blur(.5px)',
            objectFit: 'cover',
            width: 'inherit',
            height: 'inherit',
          }}
          autoPlay
          muted
          loop
          id="bgvid"
          preload="auto"
          poster="assets/images/skyline.jpg"
        >
          <source src="assets/videos/city_cover.webm" type="video/webm" />
          <source src="assets/videos/city_cover.mp4" type="video/mp4" />
        </video>
        <Box
          bg="blue.100"
          zIndex={-1}
          top={0}
          opacity={0.2}
          width="full"
          height="full"
          position="absolute"
        />
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

export function TopNavigator() {
  // const isLarge = useBreakpointValue({ md: true });

  // const { colorMode, toggleColorMode } = useColorMode();
  // const logoutColor = useColorModeValue('teal', 'tomato');
  // const svgFilter = useColorModeValue(null, 'saturate(100)');

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      <Flex
        justifyContent="space-between"
        zIndex={1}
        px="8"
        py="6"
        as="nav"
        position="fixed"
        width="100%"
        bg="white"
        boxShadow="sm"
        alignItems="center"
      >
        <Heading size="md">Adam Rosenberg</Heading>
        {isDesktop ? (
          <ButtonGroup variant="link" size="lg" colorScheme="black" spacing="8">
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
    </>
  );
}

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
