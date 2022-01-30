import * as Types from '../types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type CategoriesQueryVariables = Types.Exact<{
  preview: Types.Scalars['Boolean'];
}>;


export type CategoriesQuery = { __typename?: 'Query', couponCategoryCollection?: { __typename?: 'CouponCategoryCollection', items: Array<{ __typename?: 'CouponCategory', name?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'CouponCategoryLinkingCollections', couponEntityCollection?: { __typename?: 'CouponEntityCollection', items: Array<{ __typename?: 'CouponEntity', name?: string | null | undefined, slug?: string | null | undefined, sys: { __typename?: 'Sys', id: string } } | null | undefined> } | null | undefined } | null | undefined, image?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined> } | null | undefined };


export const CategoriesDocument = gql`
    query Categories($preview: Boolean!) {
  couponCategoryCollection(preview: $preview) {
    items {
      sys {
        id
      }
      linkedFrom {
        couponEntityCollection {
          items {
            sys {
              id
            }
            name
            slug
          }
        }
      }
      name
      image {
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
    Categories(variables: CategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CategoriesQuery>(CategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Categories');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;