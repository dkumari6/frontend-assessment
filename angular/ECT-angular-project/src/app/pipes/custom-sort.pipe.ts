import { Pipe, PipeTransform } from "@angular/core";

// Pipe to sort array by one or more keys (ascending/descending).
@Pipe({
    name: 'customSort',
    pure: true
})
export class CustomSortPipe implements PipeTransform {

    // Main sort function. Can sort by one or more keys.
    transform<T>(value: T[], criteria: string | string[]): T[] {

        if (!Array.isArray(value)) return value;

        const criteriaArray = Array.isArray(criteria) ? criteria : [criteria];

        // Create a new array, don't mutate the original
        const sortedArray = [...value].sort((a, b) => {
            for (const criterion of criteriaArray) {
                const isDescending = criterion.startsWith('-'); 
                const key = isDescending ? criterion.slice(1) : criterion;

                const valA = this.getValue(a, key);
                const valB = this.getValue(b, key);

                const comparison = this.compareValues(valA, valB);

                // If different, return comparison result
                if (comparison !== 0) {
                    return isDescending ? -comparison : comparison;
                }
            }
            return 0; // If equal, no change
        });

        return sortedArray;
    }

    // Get value from nested object using dot notation.
    private getValue(item: any, key: string): any {
        try {
            return key.split('.').reduce((acc, part) => acc?.[part], item);
        } catch {
            return undefined; // If path invalid, return undefined
        }
    }

    // Compare different types (numbers, strings, dates, etc.)
    private compareValues(a: any, b: any): number {
        if (a === b) return 0;
        if (a == null) return -1; // Null is smaller
        if (b == null) return 1;  // Null is larger

        if (this.isDate(a) && this.isDate(b)) {
            return a.getTime() - b.getTime(); // Compare dates
        }

        if (Array.isArray(a) && Array.isArray(b)) {
            const len = Math.min(a.length, b.length); 
            for (let i = 0; i < len; i++) {
                const result = this.compareValues(a[i], b[i]);
                if (result !== 0) return result;
            }
            return a.length - b.length; // If equal, compare lengths
        }

        if (typeof a === 'number' && typeof b === 'string') {
            return String(a).localeCompare(b); // Convert number to string
        }

        if (typeof a === 'string' && typeof b === 'number') {
            return a.localeCompare(String(b)); // Convert number to string
        }

        if (typeof a === 'number' && typeof b === 'number') {
            return a - b; // Compare numbers
        }

        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b); // Compare strings
        }

        if (typeof a === 'boolean' && typeof b === 'boolean') {
            return (a === b) ? 0 : a ? 1 : -1; // Compare booleans
        }

        return String(a).localeCompare(String(b)); // Convert to string and compare
    }

    // Check if value is valid Date
    private isDate(val: any): val is Date {
        return Object.prototype.toString.call(val) === "[object Date]" && !isNaN(val.getTime());
    }
}
