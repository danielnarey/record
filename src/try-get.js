/* ### tryGet(rec, k, [test], [err]) => Promise<v|err>
 * If *k* exists in *rec* and passing its associated value *v* to *test* 
 * returns `true`, `tryGet` returns a promise resolving to *v*. If *k* does 
 * not exist or *test* returns `false`, `tryGet` returns a promise that 
 * rejects with *err*. The default *test* function returns `true` for any 
 * value that is not `undefined` or `null`.
*/
export default (
  rec, 
  k, 
  test = (x) => (x !== undefined && x !== null),
  err = new Error('Key does not exist or is missing an associated value'),
) => rec((obj) => {
  const out = obj[k];
    
  return test(out) ? Promise.resolve(out) : Promise.reject(err);
});