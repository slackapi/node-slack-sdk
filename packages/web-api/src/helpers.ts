/**
 * Build a Promise that will resolve after the specified number of milliseconds.
 * @param ms milliseconds to wait
 * @param value value for eventual resolution
 */
export function delay<T>(ms: number, value?: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}
