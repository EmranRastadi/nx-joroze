import { CouponEntity } from '@joroze/cms';
import React, { useContext, useState } from 'react';

export type Props = {
  children: React.ReactElement;
};

export type ContextProps = {
  brand: CouponEntity | undefined;
  setBrand: React.Dispatch<React.SetStateAction<CouponEntity | undefined>>;
};

const BrandContext = React.createContext<ContextProps>({
  brand: undefined,
  setBrand: () => {
    return;
  },
});

const BrandContextProvider = ({ children }: Props) => {
  const [brand, setBrand] = useState<ContextProps['brand']>();

  return (
    <BrandContext.Provider
      value={{
        brand,
        setBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export default BrandContextProvider;

export { BrandContext };

export const useBrandContext = (): ContextProps => useContext(BrandContext);
