import { BellIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Flex,
  Collapse,
} from '@chakra-ui/react';
import { useChannel, useEvent } from '@harelpls/use-pusher';
import React, { useState } from 'react';
import Flickity from 'react-flickity-component';

type Alert = {
  title: string;
  description: string;
  id: string;
};

type UseAlertSubscriptionOptions = {
  channelName: 'alert-notifications';
  eventName: 'alert';
  cb: (payload?: Alert[]) => void;
};

const useAlertSubscription = ({
  channelName,
  eventName,
  cb,
}: UseAlertSubscriptionOptions) =>
  useEvent(useChannel(channelName), eventName, cb);

const AlertBanner = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const dismissAlerts = () => setAlerts([]);

  useAlertSubscription({
    channelName: 'alert-notifications',
    eventName: 'alert',
    cb: (incomingAlerts) => {
      if (incomingAlerts) {
        setAlerts([...alerts, ...incomingAlerts]);
      }
    },
  });

  return (
    <Collapse in={alerts.length > 0} animateOpacity>
      <Box as="section">
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
          py="2"
          px={{ base: '3', md: '6', lg: '8' }}
          color="white"
          bg={useColorModeValue('purple.800', 'purple.400')}
        >
          <Stack
            width={{ base: 'full', sm: 'full' }}
            justifyContent="center"
            alignItems="center"
            spacing="3"
            direction={{ base: 'column', sm: 'row' }}
          >
            <Icon as={BellIcon} fontSize="2xl" h="10" />
            <Box
              width="full"
              sx={{
                '> .flickity-enabled': {
                  width: { base: 'full' },
                },
              }}
              marginEnd="2"
            >
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Flickity
                options={{
                  groupCells: 1,
                  draggable: true,
                  cellAlign: 'left',
                  contain: true,
                  prevNextButtons: false,
                  pageDots: false,
                  autoPlay: 5000,
                  adaptiveHeight: true,
                  pauseAutoPlayOnHover: false,
                }}
              >
                {alerts.map((alert) => {
                  return (
                    <Flex key={alert.id} w="full">
                      <Text
                        wordBreak="break-word"
                        flexGrow={1}
                        textAlign="center"
                      >
                        <Text fontWeight="bold" as="span">
                          {alert.title}
                        </Text>{' '}
                        {alert.description}
                      </Text>
                    </Flex>
                  );
                })}
              </Flickity>
            </Box>
          </Stack>
          <Button
            onClick={dismissAlerts}
            variant="outline"
            colorScheme="whiteAlpha"
            borderColor="whiteAlpha.400"
            fontWeight="medium"
            rounded="base"
            w={{ base: 'full', sm: 'auto' }}
            flexShrink={0}
          >
            <SmallCloseIcon />
          </Button>
        </Stack>
      </Box>
    </Collapse>
  );
};

export default React.memo(AlertBanner);
