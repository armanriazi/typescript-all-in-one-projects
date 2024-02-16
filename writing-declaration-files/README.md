
`Benefits of detailed declaration files`

With these changes in place, any TypeScript code that uses these functions will **ensure that the desired message structure** is adhered to. Having a detailed declaration file for external JavaScript functions and libraries enhances the available **documentation** because it can be integrated directly into the **code completion or code-hinting** engine of the IDE we are using. Declaration files describe code as if it were written directly in TypeScript and will enforce the same strict typing rules for any code that we write using the external JavaScript libraries.

## Nested namespaces and a function

```ts
// This code declares a TypeScript module with nested namespaces and a function
declare module FirstNamespace {
    module SecondNamespace {
        module ThirdNamespace {
            function log(msg: string); // function to log a message
        }
    }
}

FirstNamespace.SecondNamespace.ThirdNamespace.log("test");
```

### The declaration option

The final TypeScript compilation option that we will discuss here is the declaration option, which will generate declaration files from our source TypeScript or our source JavaScript files.

We can turn this option on by uncommenting it in the tsconfig.js file as follows:

```json
    "outDir": "dist",  
    "allowJs":true,
    "declaration": true,   
    "declarationMap": true,
```    

For example:

```ts
// Interface defining filterable object
interface IFilterable {
  name?: string;
}

// Function to filter undefined values in an array of filterable objects
function filterUndefined<T extends IFilterable>
  (input: Array<T>): Array<T> 
{
  let output: Array<T> = [];
  for (let item of input) {
    // Check if name property exists and is not null or undefined
    if (item.name?.length) {
      output.push(item);
    }
  }
  return output;
}
```

Generated declaration file

```ts
// Interface defining filterable object
interface IFilterable {
  name?: string;
}

// Function signature to filter undefined values in an array of filterable objects
declare function filterUndefined<T extends IFilterable>(input: Array<T>): Array<T>;

// Caption: Declare function signature to filter undefined values in an array of filterable objects based on name property.

```