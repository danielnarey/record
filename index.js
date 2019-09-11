export default {
  from: (obj) => (o) => o({ ...obj }),
  get: (r, key) => r((obj) => obj[key]),
  tryGet: (r, key, test = empty, cb) => r((obj) => obj[key]
};
