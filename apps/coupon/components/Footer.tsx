import { Box, Flex, Stack, StackDivider } from '@chakra-ui/react';
import Copyright from './Copyright';
import LinkGrid from './LinkGrid';
import SocialMediaLinks from './SocialMediaLinks';
import SubscribeForm from './SubscribeForm';
import Image from "next/legacy/image";

const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    py="12"
    px={{ base: '4', md: '8' }}
    bgColor="rgb(239, 240, 247)"
    width="full"
  >
    <Stack spacing="10" divider={<StackDivider />}>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '10', lg: '28' }}
      >
        <Flex flex="1">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            draggable={false}
            layout="fixed"
            width={200}
            height={50}
          />
        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '10', md: '20' }}
        >
          <LinkGrid spacing={{ base: '10', md: '20', lg: '28' }} flex="1" />
          <SubscribeForm width={{ base: 'full', md: 'sm' }} />
        </Stack>
      </Stack>
      <Stack
        direction={{ base: 'column-reverse', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
