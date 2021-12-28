import cms from '@joroze/cms';
import { GetStaticPropsContext } from 'next';

export const fetchFromContentful = (preview?: boolean) =>
  cms(
    process.env.CONTENTFUL_GRAPHQL_ENDPOINT as string,
    preview
      ? (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string)
      : (process.env.CONTENTFUL_ACCESS_TOKEN as string)
  );

export default function Index() {
  return <div>Hello</div>;
}

Index.defaultProps = {
  meta: {
    title: 'Dunks',
    description: 'Nike x Off White | The 50',
    imgSrc: '',
  },
};

export const getStaticProps = async ({ preview }: GetStaticPropsContext) => {
  const categories = await fetchFromContentful(preview).Categories({
    preview: !!preview,
  });

  // console.log(
  //   'Available categories: ',
  //   JSON.stringify(categories.couponCategoryCollection, null, 2)
  // );

  // const shoes = new Array(50).fill(0).map((_, index) => {
  //   const shoeId = index + 1;
  //   const imageExtension = shoeId === 24 ? 'webp' : 'png';

  //   return {
  //     id: shoeId,
  //     imgSrc: `/assets/dunks/${shoeId}.${imageExtension}`,
  //     href: `https://stockx.com/nike-dunk-low-off-white-lot-${shoeId}`,
  //   };
  // });

  return {
    props: {},
  };
};

// {preview ? (
//   <>
//     This is page is a preview.{' '}
//     <a
//       href="/api/exit-preview"
//       className="underline hover:text-cyan duration-200 transition-colors"
//     >
//       Click here
//     </a>{' '}
//     to exit preview mode.
//   </>
