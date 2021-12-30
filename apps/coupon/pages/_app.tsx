import { AppProps } from 'next/app';
import './styles.css';
import type { GetStaticPropsContext, NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '@joroze/ui';
import Layout from '../layouts/Layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <ChakraProvider resetCSS theme={Theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}

export default CustomApp;
