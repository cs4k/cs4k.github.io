# Style Guide for our Firebase Functions Code

## Description

This file explains how the files and code in this part of the project
should be organized.

## Naming Convention Overview

**Dash Case**: some-name

**Lower Camel Case**: someName

**Upper Camel Case**: SomeName

Folders should always use dash case.

Camel case should only be used if a file has code implementing a single entity.
e.g. a class should get its own file named after it.
Classes use upper camel case, and so the file should also use upper camel case.

## Modules

Most of our code will be divided into modules.

### Description

Entities with similar uses should be in a single module.
In C++ and Java, modules are more often referred to as *libraries*.

e.g. a module named "my-math" can hold many math functions and constants.
```TypeScript
// import all (*) elements exported from file './my-math/module'
// and put them in a constant object named 'myMath'.
import * as myMath from './my-math/module';

// a module function
myMath.sqrt( 4 );// 2

// a module constant
myMath.PI;// the PI constant

// a module class
new myMath.Matrix;// creates new Matrix object
```

A **module** holds many **module elements**.
("elements" is the unofficial term used by us.)
These elements can be functions, classes, constants, etc.

### Naming a Module

It's standard for a module to have a short *lowercase* name.
If it has to have multiple words, it should use dash case.
e.g. "google-map-react"

Obviously, the label for the module object in the code cannot have dash case.
Normally, the label is just the the lower camel case version
of the original name.
```TypeScript
import * as formData from 'form-data';
```

### File Organization

#### Containing Folder

The entire module falls under a *containing folder*.
This containing folder name should use dash case and should have
the same name as the module.

e.g. a module named "my-math" should be under a folder named "my-math".

#### Module Element Files

A module's individual elements should be defined in separate files.

As is standard, Classes and Interfaces get their own files, which are
named after them. e.g. the Matrix class is defined in Matrix.ts.

Functions normally don't get their own file and are stored with other elements.
Their file name is in dash case. The file has a general name.
Try not to commit a file's name to one function.
Unlike classes/interfaces, functions often end up sharing files with other functions.

The coder can also add subfolders to the module's containing folder
in order to further organize elements. This is up to the coder's discretion.

#### module.ts File

All module elements should be re-exported by a single module.ts file.

This simplifies the importing process from outside the module because
all of a module's exports are in one file. If one wants to read about a
certain export, the module.ts file also specifies the sources of all exports.
The module.ts file may also contain brief descriptions of module elements.

This also gives us the liberty to re-organize the module from the inside
without having to worry about breaking the module's interface.

#### Example

```TypeScript
// File Structure:
// client.ts
// some-module/module.ts
// some-module/Class1.ts
// some-module/Class2.ts

// ./some-module/Class1.ts
export class Class1 {
  //...
}

// ./some-module/Class2.ts
export class Class2 {
  //...
}

// ./some-module/module.ts
export { Class1 } from "./Class1";
export { Class2 } from "./Class2";

// ./client.ts
import * as someModule from './some-module/module.ts';
someModule.Class1;
someModule.Class2;
```