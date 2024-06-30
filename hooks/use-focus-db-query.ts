import { commonErrorToastAndroid } from "@/utils/toast.utils";
import { useFocusEffect } from "expo-router";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";

export function useFocusDBQuery<
  Targs,
  Rargs extends Object | string | number | undefined | null
>(
  fn: (db: SQLiteDatabase, params: Targs) => Promise<Rargs>,
  options?: { params?: Targs }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Rargs | null>(null);
  const [error, setError] = useState<any>(null);
  const db = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      console.log("fetching data");
      fetchData();
    }, [])
  );

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await fn(db, options?.params as unknown as Targs);
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
