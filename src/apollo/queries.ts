import { gql } from "@apollo/client";
import { client } from "../index";
import { setLocals } from "./setLocals";

export const GET_CURRENCIES = () => {
  return client
    .query({
      query: gql`
        query GetCurrencies {
          currencies {
            label
            symbol
          }
        }
      `,
    })
    .then((result) => {
      if (result.data.currencies[0].symbol)
        setLocals("selectedCurrency", result.data.currencies[0].symbol);
      return result;
    });
};

export const GET_CATEGORIES = () => {
  return client
    .query({
      query: gql`
        query GetCategories {
          categories {
            name
          }
        }
      `,
    })
    .then((result) => {
      return result;
    });
};

export const GET_ITEMS = (categoryName: string) => {
  // let b = {
  //   input: {
  //     title: categoryName,
  //   },
  // };

  return client
    .query({
      query: gql`
        query GetItems($input: String!) {
          category(input: { title: $input }) {
            products {
              name
              inStock
              gallery
              prices {
                currency {
                  symbol
                }
                amount
              }
            }
          }
        }
      `,
      variables: { input: categoryName },
    })
    .then((result) => {
      return result;
    });
};

//
// export const GET_SELECTED_CURRENCY = () => {
//   return client
//     .query({
//       query: gql`
//         query GetSelectedCurrency {
//           selectedCurrency @client
//         }
//       `,
//     })
//     .then((result) => {
//       return result;
//     });
// };