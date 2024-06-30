import { Expense, ExpenseGroup, ExpenseGroupWithTotal } from "@/types/db.types";
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 2;
  const userVersion = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  let currentDbVersion = userVersion?.user_version || 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`DROP TABLE IF EXISTS expense_group;`);
    await db.execAsync(`DROP TABLE IF EXISTS expense;`);
    await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  Create TABLE expense_group (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    modified_at TEXT NOT NULL,
    created_by TEXT NOT NULL
  );
  CREATE TABLE expense (
    id INTEGER PRIMARY KEY NOT NULL,
    expense_group_id INTEGER, 
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    made_at TEXT NOT NULL,
    created_at TEXT NOT NULL, 
    modified_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    FOREIGN KEY(expense_group_id) REFERENCES expense_group(id)
  );
  `);
    // Sample expense-group entry
    const sampleExpenseGroup = await db.runAsync(
      "INSERT INTO expense_group (name, created_at, modified_at, created_by) VALUES (?, ?, ?, ?)",
      "Groceries",
      "2023-06-26 14:30:00",
      "2023-06-26 14:30:00",
      "SYS"
    );
    // Sample expense entry
    await db.runAsync(
      "INSERT INTO expense (title, expense_group_id, amount, made_at, created_at, modified_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
      "Groceries",
      sampleExpenseGroup.lastInsertRowId,
      50.75,
      "2023-06-26 14:30:00",
      "2023-06-26 14:30:00",
      "2023-06-26 14:30:00",
      "SYS"
    );

    currentDbVersion = 1;
  }

  if (currentDbVersion === 1) {
    await db.execAsync(`
      ALTER TABLE expense ADD COLUMN is_paid INTEGER DEFAULT 0;
    `);
  }

  // if (currentDbVersion === 2) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export const getVersion = async (db: SQLiteDatabase) => {
  const result = await db.getFirstAsync<{ "sqlite_version()": string }>(
    "SELECT sqlite_version()"
  );
  return result?.["sqlite_version()"];
};

export const getAllExpenseGroups = async (db: SQLiteDatabase) => {
  const result = await db.getAllAsync<ExpenseGroup>(
    "SELECT * FROM expense_group ORDER BY name"
  );
  return result;
};

export const getMostRecentlyUsedExpenseGroups = async (
  db: SQLiteDatabase,
  options?: { limit?: number }
) => {
  const expenses = await db.getAllAsync<Expense>(
    "SELECT DISTINCT(expense_group_id) as expense_group_id FROM expense ORDER BY made_at DESC LIMIT ?",
    options?.limit || 5
  );

  // If no expenses are found, return an empty array early
  if (expenses.length === 0) {
    return [];
  }

  // Extract expense group IDs and join them as a comma-separated string
  const expenseGroupIds = expenses
    .map((expense) => expense.expense_group_id)
    .join(",");

  const result = await db.getAllAsync<
    Pick<ExpenseGroupWithTotal, "id" | "name" | "totalExpense">
  >(
    `SELECT expense_group.id, expense_group.name, SUM(expense.amount) as totalExpense 
     FROM expense_group 
     LEFT JOIN expense ON expense_group.id = expense.expense_group_id 
     WHERE expense.expense_group_id IN (${expenseGroupIds})
     GROUP BY expense_group.id 
     ORDER BY MAX(expense.made_at) DESC`
  );
  return result;
};

export const getAllExpenses = async (db: SQLiteDatabase) => {
  const result = await db.getAllAsync<Expense>("SELECT * FROM expense");
  return result;
};

export const getAllExpenseGroupsWithTotalExpenses = async (
  db: SQLiteDatabase
) => {
  const result = await db.getAllAsync<ExpenseGroupWithTotal>(
    `SELECT expense_group.*, SUM(expense.amount) as totalExpense 
    FROM expense_group
    LEFT JOIN expense ON expense_group.id = expense.expense_group_id
    GROUP BY expense_group.id ORDER BY expense_group.name`
  );
  return result;
};

export const createGroup = async (db: SQLiteDatabase, name: string) => {
  const result = await db.runAsync(
    "INSERT INTO expense_group (name, created_at, modified_at, created_by) VALUES (?, ?, ?, ?)",
    name,
    new Date().toISOString(),
    new Date().toISOString(),
    "SYS"
  );
  return result;
};

export const createExpense = async (
  db: SQLiteDatabase,
  data: {
    title: string;
    amount: number;
    date: Date;
    isPaid: boolean;
    expenseGroupId: number;
  }
) => {
  const result = await db.runAsync(
    "INSERT INTO expense (title, amount, made_at, is_paid, expense_group_id, created_at, modified_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    data.title,
    data.amount,
    data.date.toISOString(),
    data.isPaid,
    data.expenseGroupId,
    new Date().toISOString(),
    new Date().toISOString(),
    "SYS"
  );
  return result;
};

export const getTotalExpenseThisMonth = async (db: SQLiteDatabase) => {
  const result = await db.getFirstAsync<{ "SUM(amount)": number | null }>(
    "SELECT SUM(amount) FROM expense WHERE made_at >= date('now', 'start of month') AND made_at <= date('now', 'start of month', '+1 month', '-1 day')"
  );
  return result?.["SUM(amount)"] ?? null;
};

export const getTotalExpenseUserOwes = async (db: SQLiteDatabase) => {
  const result = await db.getFirstAsync<{ "SUM(amount)": number | null }>(
    "SELECT SUM(amount) FROM expense WHERE is_paid = 0"
  );
  return result?.["SUM(amount)"] ?? null;
};

export const getRecentTransactions = async (
  db: SQLiteDatabase,
  options: {
    fromLastNDays: number;
  }
) => {
  const result = await db.getAllAsync<
    Pick<Expense, "id" | "title" | "amount" | "is_paid" | "made_at">
  >(
    `SELECT id, title, amount, made_at, is_paid FROM expense WHERE made_at >= date('now', '-${options.fromLastNDays} days') ORDER BY made_at DESC`
  );
  return result;
};
