import { InMemoryCache, makeVar } from "@apollo/client";

export const selectedCurrencyVar = makeVar<string>("");

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        selectedCurrency: {
          read() {
            return selectedCurrencyVar();
          },
        },
      },
    },
  },
});
