/**
 * Question 3.
 * Executes a string of JavaScript code.
 *
 * @param {string} code - Code to execute.
 * @param {Object} [variables={}] - User-defined variables available in code.
 * @param {string} [codeName='Anonymous'] - Name for the code, just for debugging.
 * @returns {any} - The result of code or `undefined` if an error occurs.
 */

function execute(code, variables = {}, codeName = 'Anonymous') {
    // Setup the global context with default functions and user-defined variables.
    const globalContext = {
        $math: {
            sum: (a, b) => a + b,
            mul: (a, b) => a * b,
        },
        $logger: console.log,
        $error: (message) => { throw new Error(message); },
        ...variables, // User variables can override defaults.
    };

    try {
        // Create a function dynamically with global context keys as parameters.
        const func = new Function(...Object.keys(globalContext), '"use strict"; ' + code);
        
        // Pass global context values as args.
        const args = Object.values(globalContext);

        // Execute function with args.
        return func.call(null, ...args);

    } catch (error) {
        // Handle any errors during execution and provide context.
        console.error(`Error executing code "${codeName}":`, error);
        return undefined; // Return undefined for errors.
    }
}

// Example Usage
execute('$logger("Sum:", $math.sum(a, b))', { a: 17, b: 3 }, 'Sum Example');
execute('$logger("Mul:", $math.mul(a, b))', { a: 17, b: 3 }, 'Multiplication Example');

// Additional Test Cases
console.log(execute('return a + b;', { a: 5, b: 10 }, 'Simple Addition')); // Returns 15
console.log(execute('return $math.mul(a, b) + c;', { a: 2, b: 4, c: 6 }, 'Combined Operation')); // Returns 14
execute('$logger("Hello again!");', {}, 'Logging Example'); // Logs message