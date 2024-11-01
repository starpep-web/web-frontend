import 'server-only';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject, OperationVariables, QueryOptions } from '@apollo/client';
import { DeepPartial } from 'utility-types';
import { NEXT_REVALIDATE_TIME, NEXT_PUBLIC_STRAPI_URL, STRAPI_API_TOKEN } from '@lib/config/app';

const httpLink = new HttpLink({
  uri: `${NEXT_PUBLIC_STRAPI_URL}/graphql`,
  fetch: function(uri, options) {
    return fetch(uri, {
      ...options || {},
      headers: {
        ...options?.headers || {},
        Authorization: `Bearer ${STRAPI_API_TOKEN}`
      },
      next: {
        revalidate: NEXT_REVALIDATE_TIME
      }
    });
  }
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
});

export const fetchGraphQL = async <TVariables extends OperationVariables, TData = any>(options: QueryOptions<DeepPartial<TVariables>, TData>) => {
  const result = await client.query(options);
  if (result.error) {
    throw result.error;
  }

  return result.data;
};
