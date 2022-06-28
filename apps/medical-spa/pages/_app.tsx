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
          bg: '#2a384e',
        },
      }),
    },
  },

  Theme
);

const WEBSITE_TITLE = 'Adam M. Rosenberg, PA-C';
const WEBSITE_DESCRIPTION = 'NYC Based Board Certified PA. Botox & Filler';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={themeWithFont}>
      <Head>
        <title>{WEBSITE_TITLE}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content={WEBSITE_TITLE} />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={'https://ssharely.joroze.com'} /> */}
        <meta property="og:title" content={WEBSITE_TITLE} />
        <meta property="og:image" content={'/assets/images/headshot.jpg'} />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        {/* <meta property="twitter:url" content={metaUrl} /> */}
        <meta property="twitter:title" content={WEBSITE_TITLE} />
        <meta property="twitter:description" content={WEBSITE_DESCRIPTION} />
        <meta
          property="twitter:image"
          content={'/assets/images/headshot.jpg'}
        />
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

export default CustomApp;
