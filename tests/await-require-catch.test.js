/**
 * @fileoverview require add `.catch()` at the end when using function with `await`
 * @author 1uokun@github.com
 */

"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require("../rules/await-require-catch");

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018 } });
ruleTester.run('await-require-catch', rule, {
    valid: [
        `async function a(){
            await b().catch(()=>{});
        }`,
        `async function a(){
            await b().catch(Function);
            await b().catch(function(){});
            await b().catch(func);
        }`,
        `async function a(){
            await b().then().catch(()=>{});
            await b().then(res=>{}).catch(()=>{});
            b().then(res=>{}).catch(()=>{});
        }`,
        // 对象链式搜索后最后一个被调用的节点
        `async function a(){
            await b.c().catch(()=>{});
            await b.c.d.e().catch(()=>{});
            await b.c.d.e().then().catch(()=>{});
        }`,
        // 作为参数
        `async function a(){
            b(await c().catch(()=>{}))
        }`,
    ],
    invalid: [
        {
            code: `async function a(){
                await b();
            }`,
            output:`async function a(){
                await b().catch(() => {});
            }`,
            errors: [
                {
                    messageId: 'requireCatch',
                },
            ],
        },
        {
            code: `async function a(){
                await b.c().then();
                await b.c.d.e().then();
            }`,
            output: `async function a(){
                await b.c().then().catch(() => {});
                await b.c.d.e().then().catch(() => {});
            }`,
            errors: [
                {messageId: 'requireCatch'},
                {messageId: 'requireCatch'},
            ],
        },
        {
            code: `async function a(){
                b(await c());
            }`,
            output:`async function a(){
                b(await c().catch(() => {}));
            }`,
            errors: [
                {
                    messageId: 'requireCatch',
                },
            ],
        },
        {
            code: `async function a(){
                await b().catch();
                await b().catch(null);
                await b().catch(123);
                await b().catch("");
                await b().catch([]);
                await b().catch({});
            }`,
            output: `async function a(){
                await b().catch(() => {});
                await b().catch(() => {});
                await b().catch(() => {});
                await b().catch(() => {});
                await b().catch(() => {});
                await b().catch(() => {});
            }`,
            errors: [
                {messageId: 'rquireFuncArg'},
                {messageId: 'rquireFuncArg'},
                {messageId: 'rquireFuncArg'},
                {messageId: 'rquireFuncArg'},
                {messageId: 'rquireFuncArg'},
                {messageId: 'rquireFuncArg'},
            ],
        },
        // undefined在AST中被认为Identifier类型
        {
            code: `async function a(){
                await b().catch(undefined);
            }`,
            output:`async function a(){
                await b().catch(() => {});
            }`,
            errors: [
                {
                    messageId: 'rquireFuncArg',
                },
            ],
        },
    ]
})