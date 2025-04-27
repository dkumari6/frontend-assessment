/**
 * Question 2.
 * Equivalence check function that checks if two values (which can be primitive, object, or array)
 * are equal:
 * 
 * @param {*} x - The first value to compare.
 * @param {*} y - The second value to compare.
 * @returns {boolean} - Returns `true` if the values are deeply equal, else `false`.
 */
function check(x, y) {
    // Loose eqality chk so that null and undefined treated as equal
    if (x == null && y == null) return true;

    // If types are different (excluding null/undefined), they are not equal
    if (typeof x !== typeof y) return false;

    // Handle primitive types and NaN correctly
    if (x !== Object(x) && y !== Object(y)) {
        return Object.is(x, y);
    }

    // Compare Date objects by timestamp
    if (x instanceof Date && y instanceof Date) {
        return x.getTime() === y.getTime();
    }

    // If one is a Date and the other is not, they are not equal
    if (x instanceof Date || y instanceof Date) return false;

    // Compare arrays
    if (Array.isArray(x) && Array.isArray(y)) {
        // Arrays with different lengths are not equal
        if (x.length !== y.length) return false;

        // Recursively compare array elements
        return x.every((val, i) => check(val, y[i]));
    }

    // If one is an array and the other is not, they are not equal
    if (Array.isArray(x) || Array.isArray(y)) return false;

    // Compare plain objects (includign handling null)
    const xKeys = Object.keys(x || {});
    const yKeys = Object.keys(y || {});

    // Combine keys from both objects to ensure all keys are chked
    const allKeys = new Set([...xKeys, ...yKeys]);

    // Recursively compare each key's value in both objects
    for (const key of allKeys) {
        if (!check(x?.[key], y?.[key])) return false;
    }

    return true;
}

const data1 = { a: 17, b: { c: 'Test', d: null } };
const data2 = { a: 17, b: { c: 'Test' } };
const data3 = { a: 17, b: null };
const data4 = { a: 17, b: { c: 'Test', d: undefined } };
const data5 = { a: 17, b: { c: 'Test', d: NaN } };
const data6 = { a: 17, b: { c: 'Test', d: NaN } };
const date1 = new Date("2025-04-24");
const date2 = new Date("2025-04-24");
const array1 = [1, 2, { a: null }];
const array2 = [1, 2, { a: undefined }];

console.log(check(data1, data2));
console.log(check(data1, data3));
console.log(check(data1, data4));
console.log(check(data5, data6));
console.log(check(date1, date2));
console.log(check(array1, array2));
