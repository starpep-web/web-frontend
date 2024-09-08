export const safeAsync = async <T = any>(fallback: T, fn: () => T | Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    console.error(error);
    return fallback;
  }
};
