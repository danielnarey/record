import test from 'ava';
import record from './dist/index';


const testObj = { 
  a: 42,
  b: '42',
  c: true,
  d: { x: 0.1, y: 0.2 },
  e: ['apple', 'orange', 'banana'],
}; 
  
const rec = record.from(testObj);


test('from', (t) => {
  t.deepEqual(rec((obj) => obj), testObj);
  t.deepEqual(record.from({})((obj) => obj), {});
  t.true(record.from()((obj) => obj) === undefined);
});


test('get', (t) => {
  t.true(record.get(rec, 'a') === 42);
  t.true(record.get(rec, 'f') === undefined);
  t.true(record.get(record.from({}), 'a') === undefined);
  t.throws(() => record.get(record.from(), 'a'));
});


test('toString', (t) => {
  t.true(record.toString(rec) === JSON.stringify(testObj));
  t.true(record.toString(record.from({}) === '{}');
  t.true(record.toString(record.from()) === undefined);
});


test('tryGet', (t) => {
  t.deepEqual(
    record.tryGet(rec, 'a'),
    Promise.resolve(42),
  );
  
  t.deepEqual(
    record.tryGet(rec, 'f', undefined, new Error('!')),
    Promise.reject(new Error('!')),
  );
  
  t.deepEqual(
    record.tryGet(record.from({}), 'f', undefined, new Error('!')),
    Promise.reject(new Error('!')),
  );
  
  t.deepEqual(
    record.tryGet(rec, 'a', (x) => x < 10, new Error('!')),
    Promise.reject(new Error('!')),
  );
  
  t.throws(() => record.tryGet(record.from(), 'a'));
});
