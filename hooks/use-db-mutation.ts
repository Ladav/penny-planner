import { DBMutationOptions, DBQueryFnType } from "@/types/db.types";
import { commonErrorToastAndroid } from "@/utils/toast.utils";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";

export function useDBMutation<Targs, Rargs>(
  fn: DBQueryFnType<Targs, Rargs>,
  options?: DBMutationOptions<Targs, Rargs>
) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Rargs | null>(null);
  const db = useSQLiteContext();

  const mutate = useCallback(async (params: Targs) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const result = await fn(db, params);
      setData(result);
      options?.onSuccess?.(result);
    } catch (error) {
      setError(String(error));
      console.log(String(error));
      commonErrorToastAndroid();
    } finally {
      setIsPending(false);
    }
  }, [isPending, options?.onSuccess, options?.params]);

  return { mutate, isPending, error, data: data ?? options?.defaultValue };
}
