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