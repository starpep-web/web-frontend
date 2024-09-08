import 'dotenv/config';
import { CodegenConfig} from '@graphql-codegen/cli';

const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`;

const config: CodegenConfig = {
  schema: GRAPHQL_URL,
  documents: ['src/lib/services/strapi/graphql/queries/**/*.ts'],
  generates: {
    'src/lib/services/strapi/graphql/__generated__/': {
      preset: 'client',
      config: {
        avoidOptionals: true,
        skipTypename: true
      }
    },
    'remote-schema.graphql': {
      plugins: ['schema-ast']
    }
  }
};

export default config;
