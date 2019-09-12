# @danielnarey/record [![Build Status](https://travis-ci.com/danielnarey/record.svg?branch=master)](https://travis-ci.com/danielnarey/record) [![npm (scoped)](https://img.shields.io/npm/v/@danielnarey/record)](https://www.npmjs.com/package/@danielnarey/record)

**A tiny functional data structure for static key-value stores**


### `from(obj) => ({...})`
Create an immutable record from a shallow clone of an object, returning a
functional interface to the record (denoted as `({...})`).

### `get(rec, k) => v|undefined`
Returns the value associated with key *k* in record *rec*, or `undefined` if
no such key exists.

### `getAsPromise(rec, k, [test, [err]]) => Promise<v|err>`
If *k* exists in *rec* and passing its associated value *v* to *test*
returns `true`, `getAsPromise` returns a promise resolving to *v*. If
*k* does not exist or *test* returns `false`, `getAsPromise` returns a
promise that rejects with *err*. If a test function is not supplied, the
default test returns `true` for any value that is not `undefined` or
`null`.

### `getWithDefault(rec, k, d, [test]) => v|d`
If *k* exists in *rec* and passing its associated value *v* to *test*
returns `true`, `getWithDefault` returns *v*. If *k* does not exist or
*test* returns `false`, `getWithDefault` returns *d*. If a test function
is not supplied, the default test returns `true` for any value that is not
`undefined` or `null`.

### `keys(rec) => [...]`
Returns an array containing all of the keys in *rec*.

### `toString(rec) => '{...}'`
Returns the contents of *rec* as a JSON string.
