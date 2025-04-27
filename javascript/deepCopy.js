/**
 * Question 1.
 * Deep copies a given object.
 * 
 * @param {*} value - The value to copy
 * @param {WeakMap} [visited=new WeakMap()] - Tracks already copied objects
 * @returns {*} - A deep copy of the value
 */
function deepCopy(value, visited = new WeakMap()) {
    // If it's a primitive or null, return it directly
    if (value === null || typeof value !== 'object') {
        return value;
    }

    // Functions can't be deep copied
    if (typeof value === 'function') {
        throw new Error('Cannot deep copy functions.');
    }

    // Handle circular refernces
    if (visited.has(value)) {
        return visited.get(value);
    }

    let copy;

    // Handle special object types
    if (value instanceof Date) {
        copy = new Date(value.getTime());
    } else if (value instanceof RegExp) {
        copy = new RegExp(value.source, value.flags);
    } else if (value instanceof Map) {
        copy = new Map();
        visited.set(value, copy);
        for (const [key, val] of value) {
            copy.set(deepCopy(key, visited), deepCopy(val, visited));
        }
    } else if (value instanceof Set) {
        copy = new Set();
        visited.set(value, copy);
        for (const item of value) {
            copy.add(deepCopy(item, visited));
        }
    } else if (ArrayBuffer.isView(value)) {
        // Handle typed arrays like int8Array and float32Array
        copy = new value.constructor(value.buffer.slice(0));
    } else if (value instanceof ArrayBuffer) {
        // Handle raw binary data
        copy = value.slice(0);
    } else if (value instanceof Error) {
        // Handle error objects separately to copy properties like message and stack
        copy = new value.constructor(value.message);
        visited.set(value, copy);
        copy.name = value.name;
        copy.stack = value.stack;
        for (const key of Object.getOwnPropertyNames(value)) {
            if (!['message', 'name', 'stack'].includes(key)) {
                copy[key] = deepCopy(value[key], visited);
            }
        }
    } else if (Array.isArray(value)) {
        // Handle arrays
        copy = [];
        visited.set(value, copy);
        for (let i = 0; i < value.length; i++) {
            copy[i] = deepCopy(value[i], visited);
        }
    } else {
        // Handle plain objects (including symbl keys)
        copy = {};
        visited.set(value, copy);
        for (const key of Reflect.ownKeys(value)) {
            copy[key] = deepCopy(value[key], visited);
        }
    }

    return copy;
}

// Test Runner

function runTestCases() {
    const results = [];

    function assertDeepEqual(actual, expected, testName) {
        try {
            if (isDeepEqual(actual, expected)) {
                results.push({ testName, passed: true });
            } else {
                results.push({ testName, passed: false, actual, expected });
            }
        } catch (error) {
            results.push({ testName, passed: false, error: error.message });
        }
    }

    function isDeepEqual(obj1, obj2, visited = new WeakMap()) {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
            return obj1 === obj2;
        }
        if (visited.has(obj1)) return true;
        visited.set(obj1, true);

        if (obj1 instanceof Date && obj2 instanceof Date) {
            return obj1.getTime() === obj2.getTime();
        }

        if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
            return obj1.source === obj2.source && obj1.flags === obj2.flags;
        }

        if (obj1 instanceof Error && obj2 instanceof Error) {
            return obj1.message === obj2.message && obj1.name === obj2.name && obj1.stack === obj2.stack;
        }

        if (ArrayBuffer.isView(obj1) && ArrayBuffer.isView(obj2)) {
            if (obj1.constructor !== obj2.constructor || obj1.length !== obj2.length) return false;
            for (let i = 0; i < obj1.length; i++) {
                if (obj1[i] !== obj2[i]) return false;
            }
            return true;
        }

        if (obj1 instanceof Map && obj2 instanceof Map) {
            if (obj1.size !== obj2.size) return false;
            for (const [key, value] of obj1) {
                if (!obj2.has(key) || !isDeepEqual(value, obj2.get(key), visited)) {
                    return false;
                }
            }
            return true;
        }

        if (obj1 instanceof Set && obj2 instanceof Set) {
            if (obj1.size !== obj2.size) return false;
            const arr1 = Array.from(obj1);
            const arr2 = Array.from(obj2);
            return arr1.every(val1 => arr2.some(val2 => isDeepEqual(val1, val2, visited)));
        }

        const keys1 = Reflect.ownKeys(obj1);
        const keys2 = Reflect.ownKeys(obj2);
        if (keys1.length !== keys2.length) return false;

        for (const key of keys1) {
            if (!isDeepEqual(obj1[key], obj2[key], visited)) {
                return false;
            }
        }
        return true;
    }

    assertDeepEqual(deepCopy(42), 42, "Primitive: Number");
    assertDeepEqual(deepCopy("Hello"), "Hello", "Primitive: String");
    assertDeepEqual(deepCopy(null), null, "Primitive: Null");

    const obj = { a: 1, b: { c: 2 } };
    assertDeepEqual(deepCopy(obj), obj, "Nested Object");

    const arr = [1, { x: 2 }, [3, 4]];
    assertDeepEqual(deepCopy(arr), arr, "Nested Array");

    const date = new Date();
    assertDeepEqual(deepCopy(date), date, "Date Object");

    const regex = /hello/i;
    assertDeepEqual(deepCopy(regex), regex, "RegExp Object");

    const map = new Map([[1, "one"], [2, { val: 2 }]]);
    assertDeepEqual(deepCopy(map), map, "Map Object");

    const set = new Set([1, 2, { three: 3 }]);
    assertDeepEqual(deepCopy(set), set, "Set Object");

    const circObj = { a: 1 };
    circObj.self = circObj;
    assertDeepEqual(deepCopy(circObj), circObj, "Circular Object");

    console.table(results);
}

runTestCases();
