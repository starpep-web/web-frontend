import { useEffect, useRef, useCallback } from 'react';
import { NEXT_PUBLIC_URL } from '@lib/config/app';

export const useClientNavigation = () => {
  const windowRef = useRef<Window>();

  useEffect(() => {
    windowRef.current = window;
  }, []);

  const navigateToNewTab = useCallback((path: string) => {
    if (!windowRef.current) {
      return;
    }

    const url = `${NEXT_PUBLIC_URL}${path}`;
    windowRef.current.open(url, '_blank');
  }, [windowRef.current]);

  return {
    navigateToNewTab
  };
};
