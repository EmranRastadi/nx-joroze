import './styles.scss';
import './nprogress.scss';

import { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ReactElement, ReactNode, useEffect } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '@joroze/ui';
import Layout from '../layouts/Layout';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PusherProvider } from '@harelpls/use-pusher';

const pusherConfig = {
  // required config props
  clientKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,

  // optional if you'd like to trigger events. BYO endpoint.
  // see "Trigger Server" below for more info
  // triggerEndpoint: '/pusher/trigger',

  // required for private/presence channels
  // also sends auth headers to trigger endpoint
  // authEndpoint: '/pusher/auth',
  // auth: {
  //   headers: { Authorization: 'Bearer token' },
  // },
};

type NextPageWithLayout = NextPage & {
  getLayout?: (
    page: ReactElement,
    pageProps: Record<string, unknown>
  ) => ReactNode;
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
    <ChakraProvider resetCSS theme={Theme}>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <PusherProvider {...pusherConfig}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </PusherProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default CustomApp;
