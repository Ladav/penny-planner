import { commonErrorToastAndroid } from "@/utils/toast.utils";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export function useDBQuery<
  Targs extends Object | string | number | undefined,
  Rargs extends Object | string | number | undefined | null
>(
  fn: (db: SQLiteDatabase, params?: Targs) => Promise<Rargs>,
  options?: { params?: Targs }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Rargs | null>(null);
  const [error, setError] = useState<any>(null);
  const db = useSQLiteContext();

  useEffect(() => {
    console.log(`useEffect fetching data, isLoading: ${isLoading}`);
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await fn(db, options?.params);
      setData(result);
    } catch (error) {
      setError(error);
      console.log(String(error));
      commonErrorToastAndroid();
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, data, error };
}
