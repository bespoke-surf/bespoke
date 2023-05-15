export const GET_ORDER_QUERY = /* GraphQL*/ `
  query GetOrder($orderId: ID!) {
    order(id: $orderId) {
        email
      }
  }
`;
