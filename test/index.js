import test from 'ava';
import record from '../dist/index.cjs';


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
  t.deepEqual(record.from()((obj) => obj), {});
  t.deepEqual(record.from(1)((obj) => obj), {});
  t.deepEqual(record.from('ab')((obj) => obj), { '0': 'a', '1': 'b' });
  t.deepEqual(record.from([1,2])((obj) => obj), { '0': 1, '1': 2 });
});


test('get', (t) => {
  t.is(record.get(rec, 'a'), 42);
  t.is(record.get(rec, 'f'), undefined);
  t.is(record.get(record.from({}), 'a'), undefined);
  t.is(record.get(record.from(), 'a'), undefined);
});


test('getAsPromise', async (t) => {
  const resolved = await record.getAsPromise(rec, 'a');
  
  t.is(resolved, 42);
  
  const noSuchKey = await t.throwsAsync(
    record.getAsPromise(rec, 'f', undefined, new Error('!')),
  );
  
  t.is(noSuchKey.message, '!');
  
  const failsTest = await t.throwsAsync(
    record.getAsPromise(rec, 'a', (x) => (x < 10), new Error('!')),
  );
  
  t.is(failsTest.message, '!');
  
  const emptyRecord = await t.throwsAsync(
    record.getAsPromise(record.from(), 'a', undefined, new Error('!')),
  );
  
  t.is(emptyRecord.message, '!');
});


test('getWithDefault', (t) => {
  t.is(record.getWithDefault(rec, 'a', 0), 42);
  t.is(record.getWithDefault(rec, 'a', 0, (x) => (x < 10)), 0);
  t.is(record.getWithDefault(rec, 'f', 0), 0);
  t.is(record.getWithDefault(record.from({}), 'a', 0), 0);
  t.is(record.getWithDefault(record.from(), 'a', 0), 0);
});


test('keys', (t) => {
  t.deepEqual(record.keys(rec), Object.keys(testObj));
  t.deepEqual(record.keys(record.from({})), []);
  t.deepEqual(record.keys(record.from()), []);
});

test('toString', (t) => {
  t.is(record.toString(rec), JSON.stringify(testObj));
  t.is(record.toString(record.from({})), '{}');
  t.is(record.toString(record.from()), '{}');
});
