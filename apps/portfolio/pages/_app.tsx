import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '@nx-joroze/ui';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to portfolio!</title>
      </Head>
      <div className="app">
        <header className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nx-logo-white.svg" alt="Nx logo" width="75" height="50" />
          <h1>Welcome to portfolio!</h1>
        </header>
        <main>
          <ChakraProvider resetCSS theme={Theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </main>
      </div>
    </>
  );
}

export default CustomApp;
