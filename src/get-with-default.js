/* ### `getWithDefault(rec, k, d, [test]) => v|d`
 * If *k* exists in *rec* and passing its associated value *v* to *test*
 * returns `true`, `getWithDefault` returns *v*. If *k* does not exist or
 * *test* returns `false`, `getWithDefault` returns *d*. If a test function
 * is not supplied, the default test returns `true` for any value that is not
 * `undefined` or `null`.
*/
export default (
  rec,
  k,
  d,
  test = (x) => (x !== undefined && x !== null),
) => rec((obj) => {
  const v = obj[k];

  return test(v) ? v : d;
});
