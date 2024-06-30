import { DBQueryFnType, DBQueryOptions } from "@/types/db.types";
import { commonErrorToastAndroid } from "@/utils/toast.utils";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";

export function useDBQuery<Targs extends object | undefined, Rargs>(
  fn: DBQueryFnType<Targs, Rargs>,
  options?: DBQueryOptions<Targs, Rargs>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Rargs | null>(null);
  const db = useSQLiteContext();

  useEffect(() => {
    console.log(`useEffect fetching data, isLoading: ${isLoading}`);
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fn(db, options?.params as Targs);
      setData(result);
      options?.onSuccess?.(result);
    } catch (error) {
      setError(String(error));
      console.log(String(error));
      commonErrorToastAndroid();
    } finally {
      setIsLoading(false);
    }
  }, [options?.onSuccess, options?.params]);

  return { isLoading, error, data: data ?? options?.defaultValue };
}
