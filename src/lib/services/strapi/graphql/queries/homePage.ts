import { graphql } from '../__generated__';
import { ResultOf } from '@graphql-typed-document-node/core';
import { fetchGraphQL } from '@lib/services/strapi/graphql/client';

const GET_HOME_PAGE = graphql(`
  query GetHomePage {
    homePage {
      data {
        attributes {
          imageGallery {
            images {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
          }
          projectLeaders {
            title
            type
            members {
              avatar {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              name
              email
              occupation
              affiliations
              website
              location
              shortCv
            }
          }
          collaborators {
            title
            type
            members {
              avatar {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              name
              email
              occupation
              affiliations
              website
              location
              shortCv
            }
          }
          developers {
            title
            type
            members {
              avatar {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              name
              email
              occupation
              affiliations
              website
              location
              shortCv
            }
          }
        }
      }
    }
  }
`);

type GetHomePage = typeof GET_HOME_PAGE;
export type GetHomePageResult = ResultOf<GetHomePage>;

export const getHomePage = async () => {
  return await fetchGraphQL({
    query: GET_HOME_PAGE
  });
};
