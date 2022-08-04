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
