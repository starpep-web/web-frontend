export type BulmaSize = 'small' | 'medium' | 'large';

export const resolveSizeClass = (size?: BulmaSize): string => {
  return size ? `is-${size}` : '';
};
