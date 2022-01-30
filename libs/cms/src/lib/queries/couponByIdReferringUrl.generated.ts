import * as Types from '../types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type CouponByIdReferringUrlQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type CouponByIdReferringUrlQuery = { __typename?: 'Query', couponEntry?: { __typename?: 'CouponEntry', referringUrl?: string | null | undefined } | null | undefined };


export const CouponByIdReferringUrlDocument = gql`
    query CouponByIdReferringUrl($id: String!) {
  couponEntry(id: $id) {
    referringUrl
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CouponByIdReferringUrl(variables: CouponByIdReferringUrlQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CouponByIdReferringUrlQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CouponByIdReferringUrlQuery>(CouponByIdReferringUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CouponByIdReferringUrl');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;