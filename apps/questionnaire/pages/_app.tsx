import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '@joroze/ui';
import Head from 'next/head';

const WEBSITE_TITLE = 'Welcome to the questionnaire demo!';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={Theme}>
      <Head>
        <title>{WEBSITE_TITLE}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content={WEBSITE_TITLE} />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={WEBSITE_TITLE} />
        <meta property="og:image" content={'/assets/logo.svg'} />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={WEBSITE_TITLE} />
        {/* <meta property="twitter:description" content={description} /> */}
        <meta property="twitter:image" content={'/assets/logo.svg'} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default CustomApp;
