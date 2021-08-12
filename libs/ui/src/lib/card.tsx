import {
  Box,
  useStyleConfig,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/react';

export interface CardProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'card'> {}

export const Card: React.FC<CardProps> = (props) => {
  const { variant, ...rest } = props;

  const styles = useStyleConfig('Card', { variant });

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} />;
};

export default Card;
