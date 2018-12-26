# common-modules

## Description

This folder holds modules containing useful pieces of reusable code.

## What belongs here?

Contrast this folder with the server-procedures folder.

Functions in these modules should be mostly **pure functions**.
i.e. They should have few **side effects**, *especially* those
which affect the database or anything outside the server.

These functions should be mostly ordinary reusable functions.

e.g. A function 
```TypeScript
areAssignedTogether( t: Teacher, v: Volunteer ): boolean
```
should go under common-modules if it doesn't
interact with the database and just checks that a volunteer's id
is included in the teacher's list of volunteer id's.

e.g. a function
```TypeScript
deleteUserFromDB( id: string ): boolean
```
should NOT go under common-modules because its side-effects affect
with the database.

## Format

Functions/Classes/Interfaces/constants/etc
with the same theme should go under the same module.
e.g. a module named "myMath" can hold `sqrt( x: number ): number`
and `sum( arr: Array<Number> ): number`. That's fine.

Modules should be defined by files under the same folder.
The individual module functions should each be defined
using the standalone function format.

However, the folder should have one **module file**
named "module.ts" which re-exports all of the functions like so:

```TypeScript
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
```

As is the standard, classes and interfaces should get their own
files with matching names.