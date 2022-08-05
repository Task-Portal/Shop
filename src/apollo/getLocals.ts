import { selectedCurrencyVar } from "./cache";

export const getLocals = (funName: string) => {
  switch (funName) {
    case "selectedCurrency":
      selectedCurrencyVar();
      break;
    default:
      console.log("Wrong function in getLocals.");
      break;
  }
};
