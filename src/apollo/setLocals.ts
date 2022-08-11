import { client } from "../index";
import { addedItemsVar, selectedCurrencyVar } from "./cache";
import { apolloVar } from "./apolloVaribles";

export const setLocals = (funName: string, value: any) => {
  let items;
  if (funName === apolloVar.addedItems) {
    items = addedItemsVar();
    items.push(value);
  } else {
    // client.cache.evict({ fieldName: funName });
    // client.cache.gc();
  }

  switch (funName) {
    case apolloVar.selectedCurrency:
      selectedCurrencyVar(value);
      break;
    case apolloVar.addedItems:
      addedItemsVar(items);
      break;
    default:
      console.log("Wrong function in setLocals.");
      break;
  }
};
