import { Box, Heading } from '@chakra-ui/react';
import { getLastSegmentInPath } from '../../lib/routes';
import { useRouter } from 'next/router';

export const Treatments = () => {
  const router = useRouter();

  return (
    <Box color="white" as="section">
      <Box
        css={{
          minHeight: ['calc(100vh - 75px)', 'calc(100dvh - 75px)'],
        }}
        width="100%"
      >
        <Box padding="8" display="flex" width="100%" minHeight="inherit">
          <Heading textTransform="capitalize">
            {getLastSegmentInPath(router.pathname)}
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default Treatments;
