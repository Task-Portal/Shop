import { ICurrency } from "./currency";

export interface IProduct {
  id: string;
  name: string;
  inStock: string;
  gallery: string[];
  prices: {
    currency: ICurrency;
    amount: string;
  }[];
}
