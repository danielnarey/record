# @danielnarey/record

**[Deprecated] A tiny functional data structure for static key-value stores**

> **Deprecation Warning**: *This experimental library is no longer in active development and will not be updated in response to Node.js version  releases or security vulnerabilities identified in the dependency tree.*

## Purpose

When you have key-value data that should only be set once in the context of an application, using a **record** gives you convenient accessors, while preventing you from accidentally modifying your application's source of truth. 

A record is just a thin layer of abstraction over `Object`, which makes it trivial to serialize record data to JSON for storage and retrieval.


## Examples

```js
import record from '@danielnarey/record';
// OR: const record = require('@danielnarey/record');

// constructor
const rec = record.from({
  banana: '🍌',
  grapes: '🍇',
  cherries: '🍒',
  watermelon: '🍉',
});

typeof(rec); //--> 'function'

// accessors
record.get(rec, 'grapes');  //--> '🍇'
record.get(rec, 'pineapple'); //--> undefined

record.getAsPromise(rec, 'grapes').then(console.log); //--> '🍇'
record.getAsPromise(rec, 'pineapple').catch(() => console.log('🙈')); //--> '🙈'

record.getWithDefault(rec, 'grapes', '🙈'); //--> '🍇'
record.getWithDefault(rec, 'pineapple', '🙈'); //--> '🙈'

// conversion
record.toString(rec); //--> '{"banana":"🍌","grapes":"🍇","cherries":"🍒","watermelon":"🍉"}'

```


## API

### `from(obj) => ({...})`
Create an immutable record from a shallow clone of an object, returning a
functional interface to the record (denoted as `({...})`).

### `get(rec, k) => v|undefined`
Returns the value associated with key *k* in record *rec*, or `undefined` if
no such key exists.

### `getAsPromise(rec, k, [test, [err]]) => Promise<v|err>`
If *k* exists in *rec* and passing its associated value *v* to *test*
returns `true`, **getAsPromise** returns a promise resolving to *v*. If
*k* does not exist or *test* returns `false`, **getAsPromise** returns a
promise that rejects with *err*. If a test function is not supplied, the
default test returns `true` for any value that is not `undefined` or
`null`.

### `getWithDefault(rec, k, d, [test]) => v|d`
If *k* exists in *rec* and passing its associated value *v* to *test*
returns `true`, **getWithDefault** returns *v*. If *k* does not exist or
*test* returns `false`, **getWithDefault** returns *d*. If a test function
is not supplied, the default test returns `true` for any value that is not
`undefined` or `null`.

### `keys(rec) => [...]`
Returns an array containing all of the keys in *rec*.

### `toString(rec) => '{...}'`
Returns the contents of *rec* as a JSON string.


## Prior Art

- Racket/rebellion: [records](https://docs.racket-lang.org/rebellion/Records.html?q=reduce)
- Elm: [records](https://elm-lang.org/docs/records)
