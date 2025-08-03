import { Color } from "@budget/category-tag";

export type Category = {
  name: string;
  budget: number;
  spent: number;
  color?: Color;
}