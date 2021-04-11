const assert = require("assert");
const setup = require("mocha").setup;
const suite = require("mocha").suite;
const test = require("mocha").test;
const ArrayStack = require("../../main/javascript/ArrayStack");

suite("ArrayStack :: Creation", function()
{
    test("can be created with maximum capacity", function()
    {
        const stack = ArrayStack.create();

        assert.strictEqual(stack instanceof ArrayStack, true);
        assert.strictEqual(stack.capacity !== undefined, true);
        assert.strictEqual(stack.capacity, ArrayStack.MAXIMUM_CAPACITY);
        assert.strictEqual(stack.size, 0);
    });

    test("can be created with positive capacity", function()
    {
        const stack = ArrayStack.withCapacity(7);

        assert.strictEqual(stack instanceof ArrayStack, true);
        assert.strictEqual(stack.capacity, 7);
        assert.strictEqual(stack.size, 0);
    });

    test("can be created with zero capacity", function()
    {
        const stack = ArrayStack.withCapacity(0);

        assert.strictEqual(stack instanceof ArrayStack, true);
        assert.strictEqual(stack.capacity, 0);
        assert.strictEqual(stack.size, 0);
    });

    test("cannot be created with undefined capacity", function()
    {
        assert.throws(() => ArrayStack.withCapacity(undefined));
        assert.throws(() => ArrayStack.withCapacity());
    });

    test("cannot be created with non-integer capacity", function()
    {
        assert.throws(() => ArrayStack.withCapacity(1.3));
    });

    test("cannot be created with negative capacity", function()
    {
        assert.throws(() => ArrayStack.withCapacity(-1));
    });

    test("cannot be created with capacity > maximum", function()
    {
        assert.throws(() => ArrayStack.withCapacity(ArrayStack.MAXIMUM_CAPACITY + 1));
    });

    test("cannot be created with constructor", function()
    {
        assert.throws(() => new ArrayStack());
    });
});

suite("ArrayStack", function()
{
    let stack = null;

    setup(function()
    {
        stack = ArrayStack.withCapacity(3);
    });

    test("has last-in first-out ordering", function()
    {
        stack.push("a");
        stack.push("b");
        stack.push("c");

        assert.strictEqual(stack.pop(), "c");
        assert.strictEqual(stack.pop(), "b");
        assert.strictEqual(stack.pop(), "a");
    });

    test("grows in size by one with each push", function()
    {
        const initialSize = stack.size;
        stack.push("a");

        assert.strictEqual(stack.size, initialSize + 1);
    });

    test("shrinks in size by one with each pop", function()
    {
        stack.push("a");
        const initialSize = stack.size;

        stack.pop();

        assert.strictEqual(stack.size, initialSize - 1);
    });

    test("cannot push undefined", function()
    {
        assert.throws(() => stack.push(undefined));
        assert.throws(() => stack.push());
    });

    test("cannot push when full", function()
    {
        stack.push("a");
        stack.push("b");
        stack.push("c");

        assert.throws(() => stack.push("d"));
    });

    test("cannot pop when empty", function()
    {
        stack.push("a");
        stack.push("b");
        stack.push("c");
        stack.pop();
        stack.pop();
        stack.pop();

        assert.throws(() => stack.pop());
    });
});

suite("ArrayStack :: Zero Capacity", function()
{
    let stack = null;

    setup(function()
    {
        stack = ArrayStack.withCapacity(0);
    });

    test("cannot push", function()
    {
        assert.throws(() => stack.push("a"));
    });

    test("cannot pop", function()
    {
        assert.throws(() => stack.pop());
    });
});
