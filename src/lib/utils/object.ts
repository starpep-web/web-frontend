export function getFromEnum<TKey extends string, TValue>(obj: Record<TKey, TValue>, key: TKey | undefined): TValue | undefined;
export function getFromEnum<TKey extends string, TValue>(obj: Record<TKey, TValue>, key: TKey | undefined, defaultKey: TKey): TValue;
export function getFromEnum<TKey extends string, TValue>(obj: Record<TKey, TValue>, key: TKey | undefined, defaultKey?: TKey): TValue | undefined {
  const value = key ? obj[key] : undefined;
  const defaultValue = defaultKey ? obj[defaultKey] : undefined;
  return value ?? defaultValue;
}
