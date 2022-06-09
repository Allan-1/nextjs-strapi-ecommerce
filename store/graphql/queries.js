import { gql } from '@apollo/client';

export const productquery = gql`
  query {
    products {
      data {
        id
        attributes {
          Title
          price
          productimage {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const productId = gql`
  query {
    products {
      data {
        id
      }
    }
  }
`;

export function getItems(prodid) {
  return gql`
  query {
    products(filters: { id: { eq: ${prodid} } }) {
      data {
        id
        attributes {
          Title,
          Description
          price
          productimage {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
}
