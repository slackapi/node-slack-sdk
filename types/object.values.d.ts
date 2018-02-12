/**
 * This declaration borrows from the ES2017 library type definitions, since its meant to describe a polyfill.
 * https://github.com/Microsoft/TypeScript/blob/9f10888b10df8e5d8a35f37f809fbc6f3a32c987/lib/lib.es2017.object.d.ts#L22-L32
 */
export = ObjectValues;

/**
 * Returns an array of values of the enumerable properties of an object
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
declare function ObjectValues<T>(o: { [s: string]: T } | { [n: number]: T }): T[];

/**
 * Returns an array of values of the enumerable properties of an object
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
declare function ObjectValues(o: any): any[];
