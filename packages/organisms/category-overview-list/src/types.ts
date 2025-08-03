import { Color } from "@budget/category-tag";

export type Category = {
  name: string;
  budget: number;
  color: Color;
  spent: number;
  id: string;
}