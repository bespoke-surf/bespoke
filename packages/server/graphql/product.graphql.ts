export const GET_PRODUCT_QUERY = /* GraphQL*/ `
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      id
      title
      handle
      totalInventory
      collections(first: 20) {
        edges {
          node {
            id
            title
            description
            handle
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            id
            url
            height
            width
            altText
          }
        }
      }
      options {
        id
        name
        values
        position
      }
      tags
      totalVariants
      variants(first: 20) {
        edges {
          node {
            id
            position
            price
            sku
            title
            compareAtPrice
            selectedOptions {
              name
              value
            }
            image {
              altText
              url
              height
              width
            }
          }
        }
      }
    }
  }
`;
