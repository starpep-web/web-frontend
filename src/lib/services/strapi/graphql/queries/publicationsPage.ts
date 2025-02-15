import { graphql } from '../__generated__';
import { ResultOf } from '@graphql-typed-document-node/core';
import { fetchGraphQL } from '@lib/services/strapi/graphql/client';

const GET_PUBLICATIONS_PAGE = graphql(`
  query GetPublicationsPage {
    publicationsPage {
      data {
        attributes {
          originalPublications {
            title
            publications {
              citation
              link
            }
          }
          relevantPublications {
            title
            publications {
              citation
              link
            }
          }
          softwarePublications {
            title
            publications {
              name
              downloadUrl
              sourceUrl
              image {
                data {
                  attributes {
                    url
                    alternativeText
                    width
                    height
                  }
                }
              }
            } 
          }
        }
      }
    }
  }
`);

type GetPublicationsPage = typeof GET_PUBLICATIONS_PAGE;
export type GetPublicationsPageResult = ResultOf<GetPublicationsPage>;

export const getPublicationsPage = async () => {
  return await fetchGraphQL({
    query: GET_PUBLICATIONS_PAGE
  });
};
