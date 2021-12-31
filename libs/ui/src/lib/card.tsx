import {
  Box,
  useStyleConfig,
  HTMLChakraProps,
  ThemingProps,
  forwardRef,
} from '@chakra-ui/react';

export interface CardProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'card'> {}

export const Card = forwardRef((props: CardProps, ref) => {
  const { variant, ...rest } = props;

  const styles = useStyleConfig('Card', { variant });

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} ref={ref} />;
});

export default Card;
