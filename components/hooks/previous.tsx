import { useRef, useEffect } from 'react';

export const usePrevious = <T extends unknown>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
