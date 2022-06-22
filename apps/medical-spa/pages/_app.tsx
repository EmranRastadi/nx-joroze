import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '@joroze/ui';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={Theme}>
      <Head>
        <title>Welcome to medical-spa!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

export default CustomApp;
