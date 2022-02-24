import Head from 'next/head';
import TopNavigator from '../components/TopNavigator/TopNavigator';
import { Link, Center, Box, useColorModeValue } from '@chakra-ui/react';
import styles from './index.module.scss';
import PrescriptionView from '../views/Prescription';

export default function Home() {
  const backgroundColor = useColorModeValue('rgb(245, 245, 245)', undefined);
  const borderColor = useColorModeValue('gray.200', 'black');
  const footerTextColor = useColorModeValue('teal', undefined);

  return (
    <Box className={styles.container}>
      <Head>
        <title>Tomorrow Health Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopNavigator />

      <Center padding="50" flexGrow="1" backgroundColor={backgroundColor}>
        <PrescriptionView />
      </Center>

      <Box
        as="footer"
        borderTop="1px solid"
        borderColor={borderColor}
        className={styles.footer}
      >
        <Box fontSize="12">
          Developed by
          <Link
            ml="1"
            mr="1"
            color={footerTextColor}
            href="https://joroze.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jordan Rosenberg
          </Link>
          for
          <Link
            ml="1"
            mr="1"
            color={footerTextColor}
            href="https://tomorrowhealth.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tomorrow Health
          </Link>
          <span role="img" aria-label="Hospital">
            🏥
          </span>
        </Box>
      </Box>
    </Box>
  );
}
