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
    messages: {
      requireCatch: "Add .catch() to avoid error: 'Uncaught (in promise)'",
      rquireFuncArg: "The first argument is required and must be a Function for .catch()",
    },

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
     * 判断是否被try catch包裹
     * @param {ASTNode} node MemberExpression
     * @returns {Boolean} 
     * @private
     * * */
    function isTryStatement(node){
      try {
        return node.parent.parent.parent.parent.type === 'TryStatement';
      }catch(err){
        return false
      }
    }

    /**
     * Reports a message for this rule (no catch).
     * @param {ASTNode} node Identifier
     * @returns {void}
     * @private
     * * */
    function UncaughtInPromiseReport(node) {
      if(isTryStatement(node)) return;
      
      context.report({
        node,
        messageId: 'requireCatch',
        fix(fixer) {
          return fixer.insertTextAfter(chain(node), '.catch(() => {})');
        },
      });
    }

    /**
     * Reports a message for this rule (catch no args).
     * @param {ASTNode} node Identifier
     * @returns {void}
     * @private
     * * */
     function CatchArgumentsReport(node) {
      if(isTryStatement(node)) return;

      const arg = node.parent.parent.arguments[0]||{};
      if(
        (!['FunctionExpression', 'ArrowFunctionExpression', 'Identifier'].includes(arg.type) &&
          arg.name !== 'Function') ||
        (arg.type === 'Identifier' && arg.name === 'undefined')
      ){
        context.report({
          node,
          messageId: 'rquireFuncArg',
          fix(fixer) {
            const left = node.parent.range[1];
            const right = node.parent.parent.range[1];
            return fixer.replaceTextRange([left+1,right-1], "() => {}");
          }
        });
      }
    }

    return {
      "AwaitExpression > CallExpression[callee.type = 'Identifier']": UncaughtInPromiseReport,
      "AwaitExpression > CallExpression > MemberExpression > Identifier[name!='catch']":UncaughtInPromiseReport,
      "AwaitExpression > CallExpression > MemberExpression > Identifier[name='catch']": CatchArgumentsReport
    };
  },
};
