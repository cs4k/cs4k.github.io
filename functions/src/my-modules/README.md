# my-modules

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
should go under my-modules if it doesn't
interact with the database and just checks that a volunteer's id
is included in the teacher's list of volunteer id's.

e.g. a function
```TypeScript
deleteUserFromDB( id: string ): boolean
```
should NOT go under my-modules because its side-effects affect
with the database.

## Format

As is the standard, classes and interfaces should get their own
files with matching names.

It's ok to have many functions under one module if they fit
the same theme.
i.e. a module named "myMath" can hold `sqrt( x: number ): number`
and `sum( arr: Array<Number> ): number`. That's fine.