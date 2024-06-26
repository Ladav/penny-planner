import { Expense, ExpenseGroup } from "@/types/db.types";
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
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
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export const getAllExpenseGroupsWithTotalExpenses = async (db: SQLiteDatabase) => {
    const result = await db.getAllAsync<ExpenseGroup>(
      "SELECT * FROM expense_group"
    );
    const expenses = await getAllExpenses(db);
    return result.map(group => {
      const totalExpense = expenses.filter(expense => expense.expense_group_id === group.id).reduce((acc, expense) => acc + expense.amount, 0);
      return { ...group, totalExpense };
    });
};

export const getAllExpenses = async (db: SQLiteDatabase) => {
  const result = await db.getAllAsync<Expense>(
    "SELECT * FROM expense"
  );
  return result;
};
