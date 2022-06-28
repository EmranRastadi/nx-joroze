import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getLastSegmentInPath } from '../lib/routes';

export function About() {
  const router = useRouter();

  return (
    <Box color="white" as="section" backgroundColor="#394e68">
      <Box
        css={{
          minHeight: ['calc(100vh - 75px)', 'calc(100dvh - 75px)'],
        }}
        width="100%"
      >
        <Flex padding="8" flexDir="column" width="100%" minHeight="inherit">
          <Heading textTransform="capitalize">
            {getLastSegmentInPath(router.pathname)}
          </Heading>
          <Flex flexDir="column" flexGrow={1}>
            <Center flexGrow={1}>
              <Box width="25%">
                <Image
                  objectFit="contain"
                  alt="headshot"
                  width="100px"
                  height="100px"
                  layout="responsive"
                  src="/assets/images/headshot.jpg"
                />
              </Box>
            </Center>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default About;
