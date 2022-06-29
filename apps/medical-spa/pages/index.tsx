import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export function Index() {
  return (
    <>
      <Box as="section" backgroundColor="#394e68">
        <Box
          css={{
            minHeight: ['calc(100vh - 75px)', 'calc(100dvh - 75px)'],
          }}
          width="100%"
        >
          <Box padding="8" display="flex" width="100%" minHeight="inherit">
            <SimpleGrid
              justifyItems="center"
              flexGrow={1}
              columns={[1, 1, 2, 2]}
              spacing={8}
            >
              <Box
                alignSelf={['center', 'center', 'flex-start', 'flex-start']}
                isolation="isolate"
                borderRadius={['20px', '15px', '10px']}
                width={['100%', '75%', '100%', '100%']}
                height={['90%', '80%', '50%', '50%']}
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
              <Box
                position="relative"
                height="50%"
                alignSelf={[null, null, 'flex-end']}
              >
                <Stack spacing="5" color="white">
                  <Heading as="h1">
                    Take care of your mind,
                    <br /> body and soul.
                  </Heading>
                  <Text fontWeight="bold" fontSize="medium">
                    Familiarize yourself with our world-class BoTox Spa and
                    Studio, only available in NYC
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
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Index;
