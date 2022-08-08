import { ICurrency } from "./currency";

export interface IProduct {
  name: string;
  inStock: string;
  gallery: string[];
  prices: {
    currency: ICurrency;
    amount: Number;
  };
}
