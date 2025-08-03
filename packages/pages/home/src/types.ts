import { Color } from "@budget/category-tag";
import { Category } from "@budget/category-overview-list";

export type CategoryData = {
  name: string;
  budget: number;
  color: Color;
  created: string;
  id: string;
}

export type PaymentHitory = { category: string; date: number; amount: number; };
export type IncomeHistory = { date: number; amount: number; };

export type MonthData = {
  categories: Record<string, { 
    spent: number;
    history: PaymentHitory[];
  }>;
  overview: {
    budget: number;
    balance: number;
  };
  history: IncomeHistory[];
}

export const MonthData = {
  categories: {},
  overview: {
    budget: 0,
    balance: 0,
  },
  history: [],
}