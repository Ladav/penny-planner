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
  made_at: string;
  created_at: string;
  modified_at: string;
  created_by: string;
};
