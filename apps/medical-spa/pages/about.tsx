import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getLastSegmentInPath } from '../lib/routes';
import actionShot from '../public/assets/images/actionshot.jpg';

export function About() {
  const router = useRouter();

  return (
    <Box color="white" as="section">
      <Flex gap={6} padding="8" flexDir="column">
        <Flex gap={1} flexDir="column">
          <Heading textTransform="capitalize">
            {getLastSegmentInPath(router.pathname)}
          </Heading>
          <Text>
            Adam Rosenberg is a Board Certified Physician Assistant based in
            NYC.
          </Text>
          <Text>
            Originally surgically and procedurally trained, he aims for precise
            and detailed results cosmetically.
          </Text>
          <Text>
            Adam is experienced with Botox injections for aesthetic
            results/facial balancing as well as medical indications including
            chronic migraines, jaw pain and excessive sweating.
          </Text>
        </Flex>
        <Flex justifyContent="flex-end">
          <Box
            isolation="isolate"
            display="flex"
            overflow="hidden"
            borderRadius="4px"
            boxShadow="2xl"
          >
            <Image
              placeholder="blur"
              width="450px"
              height="450px"
              alt="action shot"
              src={actionShot}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default About;
