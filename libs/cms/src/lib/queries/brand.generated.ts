import * as Types from '../types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type BrandQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type BrandQuery = { __typename?: 'Query', couponEntity?: { __typename?: 'CouponEntity', name?: string | null | undefined, headline?: string | null | undefined, slug?: string | null | undefined, description?: string | null | undefined, brandUrl?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, logoImage?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined, category?: { __typename?: 'CouponCategory', description?: string | null | undefined, name?: string | null | undefined, image?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined, linkedFrom?: { __typename?: 'CouponEntityLinkingCollections', couponEntryCollection?: { __typename?: 'CouponEntryCollection', total: number } | null | undefined } | null | undefined } | null | undefined };


export const BrandDocument = gql`
    query Brand($id: String!) {
  couponEntity(id: $id) {
    sys {
      id
    }
    name
    headline
    slug
    logoImage {
      url
    }
    description
    category {
      description
      image {
        url
      }
      name
    }
    linkedFrom {
      couponEntryCollection {
        total
      }
    }
    brandUrl
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Brand(variables: BrandQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BrandQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BrandQuery>(BrandDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Brand');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;