**Boris Yankov set up a GitHub repository** to house TypeScript declaration files for third-party libraries. This repository, named Definitely Typed, quickly became very popular and is now the go-to repository for declaration files.

The community has, over time, built a number of command-line tools to help with this, including **tsd, typings, and NuGet extensions**.

Note: This popularity has also meant that the TypeScript team itself has included a tool for searching for types on their [website](https://www.typescriptlang.org/dt/search?search=) named Type Search. Here, we can search for type declaration files and, as can be seen in the help text, declaration files that are either bundled or in the Definitely Typed repository.

Note that over time, some JavaScript libraries have begun to include declaration files within their main package, and therefore, we do not even need to install an @types package in order to use it.


`declare module 'underscore';`

Here, we declare that there is a module named 'underscore' that we wish to use, but we don’t provide a declaration file for it. This solution is really the last resort and should be avoided when possible.

The reason for this is that we will not have any types declared *for this library*, and it will just be of **type any**.