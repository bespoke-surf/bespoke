export const GET_CUSTOMERS_QUERY = /* GraphQL*/ `
  query GetCustomers($first: Int!, $after: String) {
    customers(first:$first, after:$after){
      edges{
        node{
          email
          displayName
          emailMarketingConsent{
            marketingOptInLevel
            marketingState
            consentUpdatedAt
          }
        }
      }
      pageInfo{
        endCursor
        hasNextPage
      }
    }
  }
`;
