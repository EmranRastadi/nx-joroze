import {
  Button,
  useColorMode,
  useColorModeValue,
  Box,
  Circle,
  Flex,
  Text,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import styles from './TopNavigator.module.scss';
import React from 'react';
import Image from 'next/image';

type Props = {
  user: {
    firstName: string;
    lastName: string;
  };
};

export default function TopNavigator({ user }: Props) {
  const { firstName, lastName } = user;

  const isLarge = useBreakpointValue({ md: true });

  const { colorMode, toggleColorMode } = useColorMode();
  const logoutColor = useColorModeValue('teal', 'tomato');
  const svgFilter = useColorModeValue(null, 'saturate(100)');

  return (
    <h1 className={styles.header}>
      <div>
        <nav>
          <ul>
            <a href=".">
              <li className={styles.logo}>
                <Box filter={svgFilter}>
                  <Image
                    src="/assets/logo.svg"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </Box>
                <div>Tomorrow Health</div>
              </li>
            </a>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <Flex h="100%" align="center">
                <Button onClick={toggleColorMode}>
                  Toggle {colorMode === 'light' ? 'Dark 🌚' : 'Light 🌞'}
                </Button>
                {isLarge && (
                  <>
                    <Divider orientation="vertical" ml="4" mr="4" />
                    <Circle
                      size="30px"
                      bg="tomato"
                      color="white"
                      fontWeight="700"
                    >
                      {firstName[0]}
                      {lastName[0]}
                    </Circle>
                    <Box ml="2">
                      <Text fontSize="13" fontWeight="700">
                        {firstName} {lastName}
                      </Text>
                      <Text fontSize="12">
                        Not you?{' '}
                        <Text as="span" fontWeight="700" color={logoutColor}>
                          Logout
                        </Text>
                      </Text>
                    </Box>
                  </>
                )}
              </Flex>
            </li>
          </ul>
        </nav>
      </div>
    </h1>
  );
}

TopNavigator.defaultProps = {
  user: {
    firstName: 'Jordan',
    lastName: 'Rosenberg',
  },
};
