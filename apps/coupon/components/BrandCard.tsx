import { Box, Flex, HTMLChakraProps, Text } from '@chakra-ui/react';
import { CouponEntity } from '@joroze/cms';
import { Card } from '@joroze/ui';
import Image from 'next/image';

type Props = {
  brand: CouponEntity;
};

const BrandCard = ({
  brand,
  children,
  ...rest
}: Props & HTMLChakraProps<'div'>) => {
  const totalSales = brand.linkedFrom?.couponEntryCollection?.total || 0;

  return (
    <Card key={brand.sys.id} m="2" gap="2" pb="3" pt="3" {...rest}>
      {brand?.logoImage?.url ? (
        <Image
          draggable={false}
          src={brand.logoImage.url}
          alt={`${brand.name} logo`}
          objectFit="contain"
          width={'80px'}
          height={'20px'}
        />
      ) : (
        <Flex flexDir="column" height="full" justifyContent="center">
          <Text textAlign="center">{brand.name}</Text>
        </Flex>
      )}
      {children}
      <Text fontSize="xs">
        {totalSales} {totalSales > 1 ? 'sales' : 'sale'}
      </Text>
    </Card>
  );
};

export default BrandCard;
