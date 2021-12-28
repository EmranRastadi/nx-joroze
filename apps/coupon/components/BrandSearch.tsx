import { AsyncSelect } from 'chakra-react-select';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export type Brand = {
  sys: {
    id: string;
  };
  description: string;
  name: string;
  slug: string;
  logoImage: {
    url: string;
  };
};

const BrandSearchInput = () => {
  const brandItemResponseCacheRef = useRef<Brand[]>([]);
  const router = useRouter();

  const handleLoadOptions = async (value: string) => {
    const brandItems: Brand[] = brandItemResponseCacheRef.current.length
      ? brandItemResponseCacheRef.current
      : await (await fetch('/api/brands')).json();

    brandItemResponseCacheRef.current = brandItems;

    const brandOptions = brandItems
      .map((brand) => ({
        id: brand.sys.id,
        label: brand.name,
        ...brand,
      }))
      .filter((brand) =>
        brand?.label?.toLowerCase().includes(value.toLowerCase())
      );

    return brandOptions;
  };

  const handleInputChange = (value: string) => {
    const newInputValue = value.replace(/\W/g, '');

    return newInputValue;
  };

  const handleOnChange = (brand: Brand) => {
    router.push(`/promos/brand/${brand.slug}`);
  };

  return (
    <AsyncSelect
      loadOptions={handleLoadOptions}
      defaultOptions
      onInputChange={handleInputChange}
      onChange={handleOnChange}
      placeholder="Search a company"
      controlShouldRenderValue={false}
    />
  );
};

export default BrandSearchInput;
