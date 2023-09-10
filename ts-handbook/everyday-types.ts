// Functions which return Promises.
// If you want to annotate the return type of a function which returns a promise, you should use the Promise type.
async function getFavoriteNumber(): Promise<number> {
    return 26;
}

// OBJECT TYPES
// here’s a function that takes a point-like object:
function printCoordinate(pt: { x: number, y: number }) {
    console.log(`Coordinates are ${ pt.x } and ${ pt.y }`);
}

printCoordinate({ x: 3, y: 7 });

// Object types can also specify that some or all of their properties are optional.
// To do this, add a ? after the property name:
function printName(name: { first: string, last?: string }) {
    console.log(`First name ${ name.first }`);
    // In JavaScript, if you access a property that doesn’t exist, you’ll get the value undefined rather than a runtime error.
    // Because of this, when you read from an optional property, you’ll have to check for undefined before using it.
    if (name.last !== 'undefined') {
        console.log(`Last name ${ name.last }`);
    }
    // or also use question mark:
    console.log(name.last?.toUpperCase());
}

// UNION TYPES
// TypeScript allows us to build new types out of existing ones using a large variety of operators.
// this function can operate on strings or numbers:
function printId(id: number | string) {
    // TypeScript will only allow an operation if it is valid for every member of the union.
    if (typeof id === "string") {
        // here we can use string operations.
        console.log(id.toUpperCase());
    } else {
        // here we cannot use string operations.
        console.log(`Your ID is: ${ id }`);
    }
}
// this works
printId(101);
// this also works
printId("202");

// Sometimes we can have a union where all the members have something in common.
// Like arrays and strings have a slice method. In cases like these, we can use the property without narrowing
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3); // return type is inferred as 'number[] | string'.
}

// TYPE ALIASES
// If we want to use a type more than once, we can give it an alias:
type Point = { x: number; y: number; };
type ID = number | string;

// INTERFACES
// An interface declaration is another way to name an object type:
interface Coordinate {
    x: number;
    y: number;
}
// it works the same as if we had used an anonymous object type.
// Differences between Type Aliases and Interfaces: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// If you would like a heuristic, use interface until you need to use features from type.

// TYPE ASSERTIONS
// Sometimes you will have information about the type of a value that TypeScript can’t know about.
// In this situation, you can use a type assertion to specify a more specific type:
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// Reminder: Because type assertions are removed at compile-time,
// there is no runtime checking associated with a type assertion.
// There won’t be an exception or null generated if the type assertion is wrong.
// Also, type assertions don't affect the behavior of the code (because they are removed by the compiler).

// TypeScript only allows type assertions which convert to a more specific or less specific version of a type.

// LITERAL TYPES
// This function only accepts a set of known values:
function printText(s: string, alignment: "left" | "right" | "center") { }
// Numeric literal types work the same way:
function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
}
// And we can combine these with non-literal types:
interface Options {
    width: number;
}
function configure(x: Options | "auto") { }

// We can use 'as const' on an object to convert the entire object to be type literals:
const req = { url: "https://example.com", method: "GET" } as const;
// The as const suffix acts like const but for the type system, ensuring that all properties
// are assigned the literal type instead of a more general version like string or number.

// Non-null Assertion Operator (Postfix !)
// Writing '!' after any expression is effectively a type assertion that the value isn't null or undefined.
// This doesn’t change the runtime behavior of your code, so it's important to only use it when you know
// that the value can't be null or undefined.
function liveDangerously(x: number | null) {
    console.log(x!.toFixed());
}