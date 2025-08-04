export default function pushIfNotNull(array: unknown[]): (el: unknown) => void {
  return (el) => {
    if (el) array.push(el);
  };
}
