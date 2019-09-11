/* ### from(obj) => ({...})
 * Create an immutable record from a shallow clone of an object, returning a
 * functional interface to the record (denoted as `({...})`).
*/
export default (obj) => (f) => f({ ...obj });
