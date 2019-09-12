/**
 * ### `getAsPromise(rec, k, [test, [err]]) => Promise<v|err>`
 * If *k* exists in *rec* and passing its associated value *v* to *test*
 * returns `true`, **getAsPromise** returns a promise resolving to *v*. If
 * *k* does not exist or *test* returns `false`, **getAsPromise** returns a
 * promise that rejects with *err*. If a test function is not supplied, the
 * default test returns `true` for any value that is not `undefined` or
 * `null`.
 */
export default (
  rec,
  k,
  test = (x) => (x !== undefined && x !== null),
  err = new Error('Key does not exist or is missing an associated value'),
) => rec((obj) => {
  const v = obj[k];

  return test(v) ? Promise.resolve(v) : Promise.reject(err);
});
