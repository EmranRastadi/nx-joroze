import Pusher from 'pusher-js';

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
import React, { useEffect, useRef, useState } from 'react';
import Flickity from 'react-flickity-component';

type Alert = {
  title: string;
  description: string;
  id: string;
};

type useAlertNotificationCbFn = (payload: Alert[]) => void;
type useAlertNotificationOptions = {
  channelName?: string;
  eventName?: string;
};

const useAlertNotifications = (
  cb: useAlertNotificationCbFn,
  options?: useAlertNotificationOptions
) => {
  const channelName = options?.channelName || 'alert-notifications';
  const eventName = options?.eventName || 'alert';

  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      }
    );

    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, cb);

    return function () {
      pusher.unsubscribe(channelName);
    };
  }, [cb, channelName, eventName]);
};

const AlertBanner = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const prevAlertsCountRef = useRef(0);
  const dismissAlerts = () => setAlerts([]);

  useAlertNotifications((incomingAlerts) => {
    prevAlertsCountRef.current = alerts.length;
    setAlerts([...alerts, ...incomingAlerts]);
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
                        flexGrow="1"
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
