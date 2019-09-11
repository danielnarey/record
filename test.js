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
  t.true(record.toString(record.from({})) === '{}');
  t.true(record.toString(record.from()) === undefined);
});


test('tryGet', async (t) => {
  t.deepEqual(
    record.tryGet(rec, 'a'),
    Promise.resolve(42),
  );
  
  const noSuchKey = await t.throwsAsync(
    record.tryGet(rec, 'f', undefined, new Error('!')),
  );
  
  t.is(noSuckKey.message, '!');
  
  const failsTest = await t.throwsAsync(
    record.tryGet(rec, 'a', (x) => x < 10, new Error('!')),
  );
  
  t.is(failsTest.message, '!');
  
  t.throws(() => record.tryGet(record.from(), 'a'));
});
