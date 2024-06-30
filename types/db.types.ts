import { SQLiteDatabase } from "expo-sqlite";

// DB Query Hook Types
export interface DBQueryFnType<Targs, Rargs> {
  (db: SQLiteDatabase, params: Targs): Promise<Rargs>;
}

export interface DBQueryOptions<Targs, Rargs> {
  params?: Targs;
  onSuccess?: (data: Rargs) => void;
  defaultValue?: Rargs;
}

export interface DBMutationOptions<Targs, Rargs> {
  params?: Targs;
  onSuccess?: (data: Rargs) => void;
  defaultValue?: Rargs;
}

// DB Query Return Types
export type ExpenseGroup = {
  id: number;
  name: string;
  created_at: string;
  modified_at: string;
  created_by: string;
};

export type ExpenseGroupWithTotal = ExpenseGroup & {
  totalExpense: number;
};

export type Expense = {
  id: number;
  expense_group_id: number;
  title: string;
  amount: number;
  is_paid: boolean;
  made_at: string;
  created_at: string;
  modified_at: string;
  created_by: string;
};
