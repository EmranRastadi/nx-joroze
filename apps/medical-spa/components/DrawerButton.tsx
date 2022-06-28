import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

const DrawerButton = () => {
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
          <DrawerHeader />

          <DrawerBody>
            <VStack alignItems="flex-start">
              <HStack>
                <Flex
                  as="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/adamrosepa/"
                >
                  <Button
                    variant="link"
                    aria-label="linked-in"
                    size="lg"
                    minWidth="unset"
                  >
                    <FaLinkedin />
                  </Button>
                </Flex>
                <Flex
                  as="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/sculptedbyadam/"
                >
                  <Button
                    variant="link"
                    aria-label="instagram"
                    size="lg"
                    minWidth="unset"
                  >
                    <FaInstagram />
                  </Button>
                </Flex>
              </HStack>
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
};

export default DrawerButton;
