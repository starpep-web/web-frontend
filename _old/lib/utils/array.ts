export const partitionArray = <T>(arr: T[], size: number): T[][] => {
  const partitioned: T[][] = new Array(Math.ceil(arr.length / size)).fill(null);

  let k = 0;
  for (let i = 0; i < arr.length; i += size) {
    partitioned[k] = arr.slice(i, i + size);
    k++;
  }

  return partitioned;
};

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
