import { useEffect, useRef, useCallback } from 'react';
import { WEBSITE_URL } from '@lib/config';

export const useClientNavigation = () => {
  const windowRef = useRef<Window>();

  useEffect(() => {
    windowRef.current = window;
  }, []);

  const navigateToNewTab = useCallback((path: string) => {
    if (!windowRef.current) {
      return;
    }

    const url = `${WEBSITE_URL}${path}`;
    windowRef.current.open(url, '_target');
  }, [windowRef.current]);

  return {
    navigateToNewTab
  };
};
