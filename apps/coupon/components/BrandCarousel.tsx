import { Box } from '@chakra-ui/react';
import { CouponEntity } from '@joroze/cms';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Flickity from 'react-flickity-component';
import ROUTES from '../lib/routes';
import BrandCard from './BrandCard';

type Props = {
  brands?: CouponEntity[];
};

const BrandCarousel = ({ brands }: Props) => {
  return brands ? (
    <Box width="full">
      <Flickity
        options={{
          groupCells: 1,
          draggable: true,
          autoPlay: 1500,
          cellAlign: 'left',
          contain: true,
          prevNextButtons: false,
          pageDots: false,
          pauseAutoPlayOnHover: true,
        }}
      >
        {brands.map((brand) => (
          <Box key={brand.sys.id}>
            <Link passHref href={`${ROUTES.BRANDS}/${brand.slug}`}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <BrandCard cursor="pointer" brand={brand} />
              </motion.div>
            </Link>
          </Box>
        ))}
      </Flickity>
    </Box>
  ) : null;
};

export default BrandCarousel;
