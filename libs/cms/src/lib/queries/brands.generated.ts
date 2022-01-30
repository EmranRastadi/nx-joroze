import * as Types from '../types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type BrandsQueryVariables = Types.Exact<{
  slug?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type BrandsQuery = { __typename?: 'Query', couponEntityCollection?: { __typename?: 'CouponEntityCollection', items: Array<{ __typename?: 'CouponEntity', name?: string | null | undefined, headline?: string | null | undefined, slug?: string | null | undefined, description?: string | null | undefined, brandUrl?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, logoImage?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined, category?: { __typename?: 'CouponCategory', description?: string | null | undefined, name?: string | null | undefined, image?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined, linkedFrom?: { __typename?: 'CouponEntityLinkingCollections', couponEntryCollection?: { __typename?: 'CouponEntryCollection', total: number } | null | undefined } | null | undefined } | null | undefined> } | null | undefined };


export const BrandsDocument = gql`
    query Brands($slug: String) {
  couponEntityCollection(where: {slug: $slug}, order: name_ASC) {
    items {
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
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Brands(variables?: BrandsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BrandsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BrandsQuery>(BrandsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Brands');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;