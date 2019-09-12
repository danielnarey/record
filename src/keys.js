/* ### `keys(rec) => [...]`
 * Returns an array containing all of the keys in *rec*.
*/
export default (rec) => rec((obj) => Object.keys(obj));
