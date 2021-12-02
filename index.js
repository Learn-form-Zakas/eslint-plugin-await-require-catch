module.exports = {
  rules: {
    'await-require-catch': require('./rules/await-require-catch'),
  },
  configs: {
    plugins:["await-require-catch"],
    rules: {
      'await-require-catch/await-require-catch': 1,
    },
  },
};
