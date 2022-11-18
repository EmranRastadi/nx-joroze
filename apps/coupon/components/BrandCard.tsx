import { Flex, HTMLChakraProps, Text } from '@chakra-ui/react';
import { CouponEntity } from '@joroze/cms';
import { Card } from '@joroze/ui';
import Image from 'next/legacy/image';

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
    <Card
      key={brand.sys.id}
      gap="2"
      pl={{ md: '7' }}
      pr={{ md: '7' }}
      m={3}
      pb="3"
      pt="3"
      {...rest}
    >
      {brand?.logoImage?.url ? (
        <Image
          draggable={false}
          src={brand.logoImage.url}
          alt={`${brand.name} logo`}
          objectFit="contain"
          width={80}
          height={20}
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
