import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { getLayout as getSiteLayout } from './Layout';

import ROUTES from '../lib/routes';
import { ReactElement } from 'react';
import BrandContextProvider, {
  useBrandContext,
} from '../contexts/brand-context';

type Props = {
  children: React.ReactNode;
};

// TODO: This layout page is currently unused. Implemented just in-case for future use.

const BrandLayout = ({ children }: Props) => {
  const { brand } = useBrandContext();
  // const router = useRouter();

  console.log('brand: ', brand);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href={ROUTES.BRANDS}>Brands</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage href="#">
            {brand?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* <BreadcrumbItem>
          <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
        </BreadcrumbItem> */}
      </Breadcrumb>
      {children}
    </>
  );
};

export const getLayout = (page: ReactElement) =>
  getSiteLayout(
    <BrandContextProvider>
      <BrandLayout>{page}</BrandLayout>
    </BrandContextProvider>
  );

export default BrandLayout;
