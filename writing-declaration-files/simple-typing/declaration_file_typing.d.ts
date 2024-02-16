// This code declares two TypeScript functions with different signatures

declare function trace(arg: string | number | boolean); // function that can take a string, number or boolean argument
declare function trace(arg: { id: number; name: string }); // function that takes an object with id and name properties as argument
