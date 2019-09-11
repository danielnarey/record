/* ### toString(rec) => '{ ... }'
 * Returns the contents of *rec* as a JSON string.
*/
export default (rec) => rec((obj) => JSON.stringify(obj));
