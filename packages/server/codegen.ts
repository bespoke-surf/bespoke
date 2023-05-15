import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'https://test.myshopify.com/admin/api/2022-10/graphql': {
      headers: {
        'X-Shopify-Access-Token': 'token',
      },
    },
  },
  documents: 'graphql/*.graphql.{ts,js}',
  generates: {
    '__generated__/shopify-types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        onlyOperationTypes: true,
        skipTypeNameForRoot: true,
        skipTypename: true,
        enumsAsTypes: true,
      },
    },
  },
};
export default config;
