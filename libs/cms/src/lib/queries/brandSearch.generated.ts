import * as Types from '../types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type BrandSearchQueryVariables = Types.Exact<{
  name_contains: Types.Scalars['String'];
}>;


export type BrandSearchQuery = { __typename?: 'Query', couponEntityCollection?: { __typename?: 'CouponEntityCollection', items: Array<{ __typename?: 'CouponEntity', description?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, logoImage?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined> } | null | undefined };


export const BrandSearchDocument = gql`
    query BrandSearch($name_contains: String!) {
  couponEntityCollection(where: {name_contains: $name_contains}, order: name_ASC) {
    items {
      sys {
        id
      }
      description
      name
      slug
      logoImage {
        url
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    BrandSearch(variables: BrandSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BrandSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BrandSearchQuery>(BrandSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BrandSearch');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;