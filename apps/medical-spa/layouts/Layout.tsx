import Footer from '../components/Footer';
import Head from 'next/head';
import TopNavigator from '../components/TopNavigator';
import { Box, SlideFade } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
  metaTags?: Record<string, string>;
};

const Layout = ({ metaTags, children }: Props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        {metaTags?.title && <title>{metaTags.title}</title>}
        {metaTags &&
          Object.entries(metaTags).map((entry, index) => {
            return (
              <meta
                key={index}
                name={entry[0]}
                property={entry[0]}
                content={entry[1]}
              />
            );
          })}
      </Head>
      <TopNavigator />
      <Box as="main" backgroundColor="#394e68">
        <SlideFade key={router.route} in>
          {children}
        </SlideFade>
      </Box>
      <Footer />
    </>
  );
};

export const getLayout = (
  page: React.ReactElement,
  pageProps: Record<string, unknown>
) => <Layout {...pageProps}>{page}</Layout>;

export default Layout;
