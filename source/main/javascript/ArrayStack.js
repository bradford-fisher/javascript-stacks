const MAXIMUM_CAPACITY = Math.pow(2, 32) - 1;
const MINIMUM_CAPACITY = 0;

class ArrayStack
{
    constructor()
    {
        if (isExternalConstructorCall)
            throw new PrivateConstructorError();
    }

    get capacity()
    {
        return instances.get(this).capacity;
    }

    get size()
    {
        return instances.get(this).size;
    }

    pop()
    {
        return instances.get(this).pop();
    }

    push(item)
    {
        instances.get(this).push(item);
    }

    static get MAXIMUM_CAPACITY()
    {
        return MAXIMUM_CAPACITY;
    }

    static create()
    {
        return construct(StandardArrayStack);
    }

    static withCapacity(capacity)
    {
        if (!Number.isInteger(capacity))
            throw new InvalidCapacityError();
        if (capacity < MINIMUM_CAPACITY)
            throw new InvalidCapacityError();
        if (capacity > MAXIMUM_CAPACITY)
            throw new InvalidCapacityError();

        if (capacity === MINIMUM_CAPACITY)
            return EMPTY_STACK;

        return construct(StandardArrayStack, capacity);
    }
}

class EmptyArrayStack
{
    get capacity()
    {
        return MINIMUM_CAPACITY;
    }

    get size()
    {
        return MINIMUM_CAPACITY;
    }

    pop()
    {
        throw new EmptyStackError();
    }

    push(item)
    {
        throw new FullStackError();
    }
}

class StandardArrayStack
{
    constructor(capacity = MAXIMUM_CAPACITY)
    {
        this.capacity = capacity;
        this.items = [];
    }

    get size()
    {
        return this.items.length;
    }

    pop()
    {
        if (this.size === MINIMUM_CAPACITY)
            throw new EmptyStackError();

        return this.items.pop();
    }

    push(item)
    {
        if (this.size === this.capacity)
            throw new FullStackError();
        if (item === undefined)
            throw new UndefinedItemError();

        this.items.push(item);
    }
}

class EmptyStackError extends Error
{
    constructor()
    {
        super("stack is empty");
    }
}

class FullStackError extends Error
{
    constructor()
    {
        super("stack is full");
    }
}

class InvalidCapacityError extends Error
{
    constructor()
    {
        super("invalid capacity");
    }
}

class PrivateConstructorError extends Error
{
    constructor()
    {
        super("constructor is private");
    }
}

class UndefinedItemError extends Error
{
    constructor()
    {
        super("item is undefined");
    }
}

let instances = new WeakMap();
let isExternalConstructorCall = true;

function construct(type, ...values)
{
    isExternalConstructorCall = false;

    const abstractStack = new ArrayStack();
    const concreteStack = new type(...values);
    instances.set(abstractStack, concreteStack);

    isExternalConstructorCall = true;

    return abstractStack;
}

const EMPTY_STACK = construct(EmptyArrayStack);

module.exports = ArrayStack;
