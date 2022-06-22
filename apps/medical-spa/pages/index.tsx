import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export function Index() {
  return (
    <section>
      <Box height="100vh" width="100%" position="relative">
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
          poster="polina.jpg"
          id="bgvid"
        >
          <source src="assets/videos/city_cover.webm" type="video/webm" />
          <source src="assets/videos/city_cover.mp4" type="video/mp4" />
          Sorry, your browser does not support HTML5 video.
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
      <Text>Hello world</Text>
    </section>
  );
}

export default Index;
