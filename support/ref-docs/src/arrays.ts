/**
 * Joins (or concatenates) all arrays passed to this function into one
 * continuous array.
 */
export function joinArrs<T>(...arrs: readonly (readonly T[])[]): T[] {
  const result: T[] = [];

  for (const arr of arrs) {
    result.push(...arr);
  }

  return result;
}

/**
 * An implementation of the standardized `flatMap`.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 *
 * @remarks
 * Adapted from https://2ality.com/2017/04/flatmap.html
 */
export function flatMap<T, U>(
  arr: readonly T[],
  mapper: (elem: T, index: number, arr: readonly T[]) => readonly U[]
): U[] {
  const result: U[] = [];

  for (const [index, elem] of arr.entries()) {
    result.push(...mapper(elem, index, arr));
  }

  return result;
}

/**
 * Filters out any elements from an array that are `undefined`.
 */
export function filterUndef<T>(arr: T[]): Exclude<T, undefined>[] {
  return arr.filter(elem => elem !== undefined) as Exclude<T, undefined>[];
}
