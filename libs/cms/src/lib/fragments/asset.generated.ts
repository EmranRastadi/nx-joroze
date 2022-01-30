import * as Types from '../types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { SysFragmentDoc } from './sys.generated';
export type AssetFragment = { __typename?: 'Asset', title?: string | null | undefined, description?: string | null | undefined, contentType?: string | null | undefined, fileName?: string | null | undefined, url?: string | null | undefined, size?: number | null | undefined, width?: number | null | undefined, height?: number | null | undefined, sys: { __typename?: 'Sys', id: string, spaceId: string, environmentId: string, publishedAt?: string | null | undefined, firstPublishedAt?: string | null | undefined, publishedVersion?: number | null | undefined } };

export const AssetFragmentDoc = gql`
    fragment Asset on Asset {
  sys {
    ...Sys
  }
  title
  description
  contentType
  fileName
  url
  size
  width
  height
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;