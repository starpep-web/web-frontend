export const joinWithDifferentLastSeparator = <T>(arr: T[], sep: string, lastSep: string): string => {
  if (!arr.length) {
    return '';
  }

  const lastItem = arr[arr.length - 1];
  if (arr.length === 1) {
    return `${lastItem}`;
  }

  const firstItems = arr.slice(0, arr.length - 1);
  return `${firstItems.join(sep)}${lastSep}${lastItem}`;
};
