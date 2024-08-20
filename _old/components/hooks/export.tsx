import { useRef, useCallback, RefObject } from 'react';
import html2canvas from 'html2canvas';

type ReturnType<T> = [RefObject<T>, () => Promise<void>];

export const useExport = <T extends HTMLElement>(exportedFilename: string): ReturnType<T> => {
  const ref = useRef<T>(null);

  const exportRef = useCallback(async () => {
    const canvas = await html2canvas(ref.current!, {
      onclone: (_, element) => {
        element.style.boxShadow = 'none';
      }
    });

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png', 1);
    a.download = exportedFilename;

    a.click();
    a.remove();
  }, [ref.current, exportedFilename]);

  return [ref, exportRef];
};
