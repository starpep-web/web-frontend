import { SearchParam } from '@lib/next/types';

const getFirstParam = (param: SearchParam): string | undefined => {
  return Array.isArray(param) ? param[0] : param;
};

export function getStringSearchParam(param: SearchParam, fallback: string): string;
export function getStringSearchParam(param: SearchParam, fallback?: undefined): string | undefined;
export function getStringSearchParam(param: SearchParam, fallback?: string): string | undefined {
  return getFirstParam(param) ?? fallback;
}

export function getStringArraySearchParam(param: SearchParam): string[] {
  if (Array.isArray(param)) {
    return param;
  }

  return typeof param !== 'undefined' ? [param] : [];
}

export function getBooleanSearchParam(param: SearchParam, force: true): boolean;
export function getBooleanSearchParam(param: SearchParam, force?: false): boolean | undefined;
export function getBooleanSearchParam(param: SearchParam, force?: boolean): boolean | undefined {
  const value = getFirstParam(param);

  return typeof value !== 'undefined' || force ? value === 'true' : undefined;
}

export function getNumberSearchParam(param: SearchParam, fallback: number): number;
export function getNumberSearchParam(param: SearchParam, fallback?: undefined): number | undefined;
export function getNumberSearchParam(param: SearchParam, fallback?: number): number | undefined {
  const value = getFirstParam(param);
  const asNumber = typeof value !== 'undefined' ? parseInt(value, 10) : undefined;

  return typeof asNumber === 'undefined' || isNaN(asNumber) ? fallback : asNumber;
}
