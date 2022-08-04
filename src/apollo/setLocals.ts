import { client } from "../index";
import { selectedCurrencyVar } from "./cache";

export const setLocals = (funName: string, value: any) => {
  client.cache.evict({ fieldName: funName });
  client.cache.gc();

  switch (funName) {
    case "selectedCurrency":
      selectedCurrencyVar(value);
      break;
    default:
      console.log("Wrong function in setLocals.");
      break;
  }
};
