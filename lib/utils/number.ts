export const formatNumberDecimals = (num: number, decimals: number): string => {
  return num.toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  });
};
