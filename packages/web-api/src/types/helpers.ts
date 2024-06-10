/** Omit all keys K from possible union types T */
export type ExcludeFromUnion<T, K extends string> = T extends T ? Omit<T, K> : never;
/** Allows to explicitly declare a function parameter as optional */
export type OptionalArgument<T> = T | void;
