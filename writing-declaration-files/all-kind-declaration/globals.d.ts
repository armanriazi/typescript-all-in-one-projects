// This code declares a TypeScript class with static methods and properties

declare class MyModuleStatic {
    static print(): void; // static method to print something
    static id: number; // static property to hold an ID number
   }

declare function sort<T extends number | string>(input: Array<T>): Array<T> { 
    // generic function to sort an array of numbers or strings
}

// This code declares a TypeScript type that accepts a generic type and maps it to a union type of string, number, or boolean

declare type stringOrNumberOrBoolean<T> =
 T extends string ? string :
 T extends number ? number :
 T extends boolean ? boolean : never;


 // This code declares a TypeScript type that extracts a type from a property of a generic type

declare type inferFromPropertyType<T> =
T extends { id: infer U } ? U : never;
