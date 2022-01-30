import * as Types from '../types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type SysFragment = { __typename?: 'Sys', id: string, spaceId: string, environmentId: string, publishedAt?: string | null | undefined, firstPublishedAt?: string | null | undefined, publishedVersion?: number | null | undefined };

export const SysFragmentDoc = gql`
    fragment Sys on Sys {
  id
  spaceId
  environmentId
  publishedAt
  firstPublishedAt
  publishedVersion
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;