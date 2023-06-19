export type BulmaColor = 'white' | 'black' | 'light' | 'dark' | 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
export const DEFAULT_COLOR: BulmaColor = 'white';

export const resolveColorClass = (color: BulmaColor): string => {
  return `is-${color}`;
};
