import { Box } from '@chakra-ui/react';
import { CouponEntry } from '@joroze/cms';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Flickity from 'react-flickity-component';
import { useQuery } from 'react-query';
import ROUTES from '../lib/routes';
import { CouponStats } from '../pages/api/coupons/stats';
import CouponCard from './CouponCard';

type Props = {
  coupons?: CouponEntry[];
};

const CouponCarousel = ({ coupons }: Props) => {
  const { data: couponStatsDictionary } = useQuery<
    Record<string, CouponStats>,
    Error
  >('/api/coupons/stats');

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
          const couponStats = couponStatsDictionary?.[coupon.sys.id];

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
                  csrCouponStats={couponStats}
                  coupon={coupon}
                  flexDir="column"
                  m={3}
                  width="initial"
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
