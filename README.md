# eslint-plugin-await-require-catch

要求使用***以`await`为前缀的函数***时需要添加***链式调用`.catch()`***, 本ESLint插件支持自动代码补齐

<img src="https://github.com/Learn-form-Zakas/eslint-plugin-await-require-catch/blob/master/screenshot/overview.gif" style="width:80%;"/>

# Installation <a href="https://npmjs.org/package/eslint-plugin-await-require-catch"><img alt="npm version" src="http://img.shields.io/npm/v/eslint-plugin-await-require-catch.svg?style=flat-square"></a> <a href="https://npmjs.org/package/eslint-plugin-await-require-catch"><img alt="npm dm" src="http://img.shields.io/npm/dm/eslint-plugin-await-require-catch.svg?style=flat-square"></a>

You'll first need to install [ESLint](http://eslint.org/):

```bash
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-await-require-catch`:

```bash
$ npm install eslint-plugin-await-require-catch --save-dev
```

Note: If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-await-require-catch` globally.

 # Usage

Add `await-require-catch` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

 ```json
 {
    "plugins": ["await-require-catch"],
 }
 ```

 Then configure the rules you want to use under the rules section.

 ```json
 {
    "rules": {
         "await-require-catch/await-require-catch": 1
     }
 }
 ```