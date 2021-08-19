import { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '@nx-joroze/ui';
import Layout from '../components/Layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <main>
      <ChakraProvider resetCSS theme={Theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </main>
  );
}

export default CustomApp;
