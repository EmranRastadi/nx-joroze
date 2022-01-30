import * as Types from '../types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type HeadlinesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HeadlinesQuery = { __typename?: 'Query', couponHeadlineCollection?: { __typename?: 'CouponHeadlineCollection', items: Array<{ __typename?: 'CouponHeadline', description?: string | null | undefined, url?: string | null | undefined, title?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, image?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined> } | null | undefined };


export const HeadlinesDocument = gql`
    query Headlines {
  couponHeadlineCollection {
    items {
      sys {
        id
      }
      image {
        url
      }
      description
      url
      title
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Headlines(variables?: HeadlinesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HeadlinesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HeadlinesQuery>(HeadlinesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Headlines');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;