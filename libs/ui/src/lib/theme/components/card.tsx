import { ComponentStyleConfig } from '@chakra-ui/react';

const Card: ComponentStyleConfig = {
  // The styles all Cards have in common
  baseStyle: ({ colorMode }) => ({
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    alignItems: 'center',
    gap: 6,
  }),
  // Two variants: rounded and smooth
  variants: {
    rounded: {
      padding: 8,
      borderRadius: 'xl',
      boxShadow: 'xl',
    },
    smooth: {
      padding: 6,
      borderRadius: 'base',
      boxShadow: 'md',
    },
  },
  // The default variant value
  defaultProps: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    variant: 'smooth',
  },
};

export default Card;
