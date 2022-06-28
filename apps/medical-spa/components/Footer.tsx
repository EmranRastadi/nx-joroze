import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <Flex
      justifyContent="flex-end"
      as="footer"
      bgGradient="linear(to-r, #20293e, #4a637feb, #20293e)"
    >
      <Flex padding={6}>
        <ButtonGroup variant="link" size="lg" colorScheme="white">
          <Flex
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/adamrosepa/"
          >
            <Button color="orange.100" aria-label="linked-in">
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
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default Footer;
