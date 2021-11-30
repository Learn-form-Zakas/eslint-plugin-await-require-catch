module.exports = {
  rules: {
    'await-require-catch': require('./rules/await-require-catch'),
  },
  configs: {
    recommended: {
      rules: {
        'await-require-catch': 1,
      },
    },
  },
};
