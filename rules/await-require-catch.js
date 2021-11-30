/**
 * @fileoverview require add `.catch()` at the end when using function with `await`
 * @author 1uokun@github.com
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',

    docs: {
      description: 'require add `.catch()` at the end when using function with `await`',
      category: 'Best Practices',
      recommended: false,
      url: 'https://github.com/Learn-form-Zakas/eslint-plugin-await-require-catch',
    },

    schema: [],

    fixable: 'code',
  },
  create(context) {
    /**
     * 获取对象链式搜索后最后一个被调用的节点 `a.b.c()`中的`c`
     * @param {ASTNode} node MemberExpression
     * @returns {ASTNode} node CallExpression
     * @private
     * * */
    function chain(node) {
      if (node.type === 'CallExpression') {
        return node;
      }
      return chain(node.parent);
    }

    /**
     * Reports a message for this rule.
     * @param {ASTNode} node Identifier
     * @returns {void}
     * @private
     * * */
    function UncaughtInPromiseReport(node) {
      context.report({
        node,
        message: "Add .catch() to avoid error: 'Uncaught (in promise)'",
        fix(fixer) {
          return fixer.insertTextAfter(chain(node), '.catch(() => {})');
        },
      });
    }

    return {
      'AwaitExpression > CallExpression > Identifier': UncaughtInPromiseReport,
      "AwaitExpression > CallExpression > MemberExpression > Identifier[name!='catch']":
        UncaughtInPromiseReport,
    };
  },
};
