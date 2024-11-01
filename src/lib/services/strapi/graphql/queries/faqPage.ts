import { graphql } from '../__generated__';
import { ResultOf } from '@graphql-typed-document-node/core';
import { fetchGraphQL } from '@lib/services/strapi/graphql/client';

const GET_FAQ_PAGE = graphql(`
  query GetFaqPage {
    faqPage {
      data {
        attributes {
          faqs {
            question
            answer
          }
        }
      }
    }
  }
`);

type GetFaqPage = typeof GET_FAQ_PAGE;
export type GetFaqPageResult = ResultOf<GetFaqPage>;

export const getFaqPage = async () => {
  return await fetchGraphQL({
    query: GET_FAQ_PAGE
  });
};
