import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated';

export const cms = (endpoint: string, accessToken: string) =>
  getSdk(
    new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
