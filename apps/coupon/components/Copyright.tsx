import { Text, TextProps } from '@chakra-ui/layout';

const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    {new Date().getFullYear()}, SSHARELY
  </Text>
);

export default Copyright;
