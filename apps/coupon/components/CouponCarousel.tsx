import { Box } from '@chakra-ui/react';
import { CouponEntry } from '@joroze/cms';
import { motion } from 'framer-motion';
import Flickity from 'react-flickity-component';
import CouponCard from './CouponCard';

type Props = {
  coupons?: CouponEntry[];
};

const CouponCarousel = ({ coupons }: Props) => {
  return coupons ? (
    <Box width="full">
      <Flickity
        options={{
          groupCells: 1,
          draggable: true,
          autoPlay: 3000,
          cellAlign: 'left',
          contain: true,
          prevNextButtons: false,
          pageDots: false,
          pauseAutoPlayOnHover: true,
        }}
      >
        {coupons.map((coupon) => {
          return (
            <Box key={coupon.sys.id}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <CouponCard
                  imgSrc={coupon?.brandEntity?.logoImage?.url || ''}
                  coupon={coupon}
                  flexDir="column"
                  m={3}
                  width={{ base: '300px', md: 'full' }}
                />
              </motion.div>
            </Box>
          );
        })}
      </Flickity>
    </Box>
  ) : null;
};

export default CouponCarousel;
