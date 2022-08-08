import { selectedCurrencyVar } from "./cache";

export const getLocals = (funName: string): string => {
  switch (funName) {
    case "selectedCurrency":
      return selectedCurrencyVar();
    default:
      console.log("Wrong function in getLocals.");
      return "";
  }
};
