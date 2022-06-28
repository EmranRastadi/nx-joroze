import './styles.scss';
import './nprogress.scss';

import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Theme } from '@joroze/ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from '../layouts/Layout';
import { useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';

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

type NextPageWithLayout = NextPage & {
  getLayout?: (
    page: React.ReactElement,
    pageProps: Record<string, unknown>
  ) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

NProgress.configure({ showSpinner: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey, signal }) => {
        const data = await (
          await fetch(`${queryKey[0]}`, {
            signal,
          })
        ).json();

        return data;
      },
    },
  },
});

const WEBSITE_TITLE = 'Adam M. Rosenberg, PA-C';
const WEBSITE_DESCRIPTION = 'NYC Based Board Certified PA. Botox & Filler';

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

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
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />, pageProps)}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default CustomApp;
