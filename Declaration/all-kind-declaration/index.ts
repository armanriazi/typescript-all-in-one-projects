// This code accesses the static properties and methods of MyModuleStatic class

MyModuleStatic.id = 10; // sets the static property 'id' to 10
MyModuleStatic.print(); // calls the static method 'print' of the class



let sortedStringArray: Array<string> = sort(["first", "second"]); // sorts an array of strings and initializes a variable
let sortedNumericArray: Array<number> = sort([1, 2, 3]); // sorts an array of numbers and initializes a variable


// This code declares two types that use the `inferFromPropertyType` type to extract types from properties of objects

type myString = inferFromPropertyType<{ id: string }>; // extracts string type from id property and creates a new type
type myNumber = inferFromPropertyType<{ id: number }>; // extracts number type from id property and creates a new type
