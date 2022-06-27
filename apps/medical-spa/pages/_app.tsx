import '@fontsource/raleway/400.css';
import '@fontsource/inter/400.css';
import '@fontsource/open-sans/700.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Theme } from '@joroze/ui';

const themeWithFont = extendTheme(
  {
    fonts: {
      heading: `'Raleway', sans-serif`,
      body: `'Inter', sans-serif`,
    },
    styles: {
      global: (props) => ({
        body: {
          bg: '#394e68',
        },
      }),
    },
  },

  Theme
);

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={themeWithFont}>
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
