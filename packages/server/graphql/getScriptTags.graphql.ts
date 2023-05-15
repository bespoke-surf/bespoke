export const GET_SCRIPTS_TAGS_QUERY = /* GraphQL*/ `
  query GetScriptTags{
    scriptTags(first: 10) {
        edges {
          node {
            id
          }
        }
      }
  }
`;
