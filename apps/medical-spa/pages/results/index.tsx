import { Box, Flex, Heading } from '@chakra-ui/react';
import { getLastSegmentInPath } from '../../lib/routes';
import { useRouter } from 'next/router';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';

export function Results({
  instagramPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <Box color="white" as="section">
      <Box
        css={{
          minHeight: ['calc(100vh - 75px)', 'calc(100dvh - 75px)'],
        }}
        width="100%"
      >
        <Box padding="8" display="flex" width="100%" minHeight="inherit">
          <Flex flexGrow={1} flexDir="column">
            <Heading textTransform="capitalize">
              {getLastSegmentInPath(router.pathname)}
            </Heading>

            <Flex justifyContent="center" gap={2} flexWrap="wrap" flexGrow={1}>
              {instagramPosts.map((post) => {
                return (
                  <Flex
                    as="a"
                    href={post.permalink}
                    key={post.id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      objectFit="contain"
                      width="300px"
                      height="300px"
                      alt="picture"
                      src={post.mediaUrl || post.thumbnailUrl}
                    />
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

type MediaType = 'IMAGE' | 'VIDEO';

type CarouselAlbumEntity = {
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
};

type InstagramPost = {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption: string;
  mediaType: MediaType;
  thumbnailUrl: string;
  timestamp: string;
  children: CarouselAlbumEntity[];
};

export const getStaticProps = async ({ params, preview = false }) => {
  const instagramPosts: InstagramPost[] = await fetch(
    `https://feeds.behold.so/${process.env.BEHOLD_INSTAGRAM_API_ENDPOINT}`
  ).then((data) => data.json());

  const instagramPostsFlattened = instagramPosts.reduce((acc, val) => {
    if (val.children) {
      acc.push(
        ...val.children
          .filter((child) => child.mediaType === 'IMAGE')
          .map((child) => ({
            ...val,
            ...child,
          }))
      );
    } else {
      acc.push(val);
    }

    return acc;
  }, []);

  return {
    props: {
      instagramPosts: instagramPostsFlattened,
    },
    revalidate: 86400, // 24 hours
  };
};

export default Results;
