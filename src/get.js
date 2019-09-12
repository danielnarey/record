/* ### `get(rec, k) => v|undefined`
 * Returns the value associated with key *k* in record *rec*, or `undefined` if
 * no such key exists.
*/
export default (rec, k) => rec((obj) => obj[k]);
