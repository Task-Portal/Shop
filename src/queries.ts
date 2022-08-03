import { gql } from "@apollo/client";
import { client } from "./index";

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
      return result;
    });
};
