import { useState, useEffect } from 'react';

export const useFetch = <T extends object>(request: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    request()
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => {
        setData(null);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [request]);

  return {
    data,
    error,
    loading
  };
};
