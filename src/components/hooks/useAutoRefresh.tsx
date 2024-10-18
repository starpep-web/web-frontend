import { useEffect } from 'react';

export const useAutoRefresh = (seconds?: number) => {
  useEffect(() => {
    if (!seconds) {
      return;
    }

    if (seconds <= 0) {
      console.error(`Invalid ${seconds} seconds to wait for auto refresh.`);
      return;
    }

    const handler = setTimeout(() => {
      window.location.reload();
    }, seconds * 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [seconds]);
};
