const assert = require("assert");
const suite = require("mocha").suite;
const test = require("mocha").test;

suite("index", function()
{
    test("exports ArrayStack", function()
    {
        const ArrayStack = require("../../main/javascript/ArrayStack");
        const Export = require("../../main/javascript").ArrayStack;

        assert.strictEqual(Export, ArrayStack);
    });
});
