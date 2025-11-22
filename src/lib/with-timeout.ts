export default function WithTimeout<T = unknown>(
  to: number,
): (promise: Promise<T>) => Promise<T> {
  return (promise) =>
    new Promise((res, rej) => {
      const timeout = setTimeout(() => {
        rej(new Error(`Timeout ${to}ms fired`));
      }, to);
      promise.then((r) => {
        clearTimeout(timeout);
        res(r);
      });
    });
}
