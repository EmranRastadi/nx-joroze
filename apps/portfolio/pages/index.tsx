import {
  Box,
  SimpleGrid,
  Center,
  Heading,
  Text,
  Stack,
  Link,
} from '@chakra-ui/react';
import { getLayout } from '../components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Hero from '../components/Hero';
import { useRef } from 'react';

function ShoeBox({ id, imgSrc, href }) {
  return (
    <Link href={href} isExternal>
      <Center>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg="gray.100"
          borderColor="gray.400"
          borderWidth="2px"
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Box
            rounded={'lg'}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${imgSrc})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            <Image
              alt="shoe"
              src={imgSrc}
              layout="responsive"
              width="100"
              height="100"
              draggable={false}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.500'}
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              Off-White x Dunk Low
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              Lot {id} of 50
            </Heading>
          </Stack>
        </Box>
      </Center>
    </Link>
  );
}
export default function Index({ shoes, meta }) {
  const { title, description } = meta;
  const router = useRouter();
  const metaUrl = `https://joroze.com${router.asPath}`;

  const shoeContainerRef = useRef(null);
  const executeScroll = () =>
    shoeContainerRef.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Head>
        <title>{`${title} | JOROZE.`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={shoes[0].imgSrc} />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={shoes[0].imgSrc} />
      </Head>
      <Box minH="calc(100vh - 70px)">
        <Hero onConfirm={executeScroll} />
      </Box>
      <SimpleGrid
        ref={shoeContainerRef}
        minChildWidth="220px"
        spacing="40px"
        padding="40px"
        paddingTop="100px"
      >
        {shoes.map(function ({ id, imgSrc, href }) {
          return <ShoeBox key={id} id={id} imgSrc={imgSrc} href={href} />;
        })}
      </SimpleGrid>
    </>
  );
}

Index.getLayout = getLayout;

Index.defaultProps = {
  meta: {
    title: 'Dunks',
    description: 'Nike x Off White | The 50',
    imgSrc: '',
  },
};

export async function getStaticProps() {
  const shoes = new Array(50).fill(0).map((_, index) => {
    const shoeId = index + 1;
    const imageExtension = shoeId === 24 ? 'webp' : 'png';

    return {
      id: shoeId,
      imgSrc: `/assets/dunks/${shoeId}.${imageExtension}`,
      href: `https://stockx.com/nike-dunk-low-off-white-lot-${shoeId}`,
    };
  });

  return {
    props: {
      shoes,
    },
  };
}
