import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p>A map is loading</p>,
});

export default MapWithNoSSR;
