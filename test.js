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


test('toString', (t) => {
  t.true(record.toString(rec) === JSON.stringify(testObj));
  t.true(record.toString(record.from({})) === '{}');
  t.is(record.toString(record.from()), '{}');
});


test('tryGet', async (t) => {
  const resolved = await record.tryGet(rec, 'a');
  
  t.is(resolved, 42);
  
  const noSuchKey = await t.throwsAsync(
    record.tryGet(rec, 'f', undefined, new Error('!')),
  );
  
  t.is(noSuchKey.message, '!');
  
  const failsTest = await t.throwsAsync(
    record.tryGet(rec, 'a', (x) => x < 10, new Error('!')),
  );
  
  t.is(failsTest.message, '!');
  
  const emptyRecord = await t.throwsAsync(
    record.tryGet(record.from(), 'a', undefined, new Error('!')),
  );
  
  t.is(emptyRecord.message, '!');
});
