import * as Types from '../types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type CouponsQueryVariables = Types.Exact<{
  active?: Types.InputMaybe<Types.Scalars['Boolean']>;
  brandId?: Types.InputMaybe<Types.Scalars['String']>;
  slug?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CouponsQuery = { __typename?: 'Query', couponEntryCollection?: { __typename?: 'CouponEntryCollection', items: Array<{ __typename?: 'CouponEntry', title?: string | null | undefined, slug?: string | null | undefined, staffPick?: boolean | null | undefined, description?: string | null | undefined, expiresAt?: string | null | undefined, referringUrl?: string | null | undefined, bannerImagesCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', url?: string | null | undefined } | null | undefined> } | null | undefined, brandEntity?: { __typename?: 'CouponEntity', slug?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, logoImage?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined, sys: { __typename?: 'Sys', id: string } } | null | undefined> } | null | undefined };


export const CouponsDocument = gql`
    query Coupons($active: Boolean, $brandId: String, $slug: String) {
  couponEntryCollection(
    where: {active: $active, slug: $slug, brandEntity: {sys: {id: $brandId}}}
  ) {
    items {
      title
      slug
      staffPick
      bannerImagesCollection {
        items {
          url
        }
      }
      brandEntity {
        sys {
          id
        }
        logoImage {
          url
        }
        slug
      }
      description
      expiresAt
      referringUrl
      sys {
        id
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Coupons(variables?: CouponsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CouponsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CouponsQuery>(CouponsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Coupons');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;