import { Box, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getLastSegmentInPath } from '../lib/routes';

export function Location() {
  const router = useRouter();

  return (
    <Box color="white" as="section">
      <Box
        css={{
          minHeight: ['calc(100vh - 75px)', 'calc(100dvh - 75px)'],
        }}
        width="100%"
      >
        <Flex padding="8" gap={4} flexDir="column" minHeight="inherit">
          <Flex flexDir="column" gap={2}>
            <Heading textTransform="capitalize">
              {getLastSegmentInPath(router.pathname)}
            </Heading>
            <Text>Adam&apos;s office is located in the New York City.</Text>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://goo.gl/maps/ZeuzkJTvvb7UELzVA"
            >
              <Text fontWeight="semibold">
                123 E 25th St, New York, NY 10010
              </Text>
            </Link>
          </Flex>
          <VStack>
            <Box
              isolation="isolate"
              boxShadow="2xl"
              overflow="hidden"
              borderRadius="4px"
              height="300px"
              width="100%"
            >
              <iframe
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9557824323397!2d-73.9862247855475!3d40.740998479328766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a7382ea583%3A0x43346a74620ba70f!2s123%20E%2025th%20St%2C%20New%20York%2C%20NY%2010010!5e0!3m2!1sen!2sus!4v1656653205196!5m2!1sen!2sus"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </Box>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}

export default Location;
