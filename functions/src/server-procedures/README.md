# Procedures

## Description

This folder is a collection of "server procedures" which carry out
routine server tasks (e.g. adding users to the database,
sending http requests, etc.).

We write the server procedures here (as opposed to directly in the
express server code) in order to make the server code as neat as possible.

## What belongs here?

These procedures are functions characterized by **side effects** such as
updates to the database, http calls to the outside world, etc.

These procedures should **NOT** include ordinary reusable functions.
A function (especially a *pure function*) which might be useful more than once
should go under myModules.

e.g. A function 
```TypeScript
areAssignedTogether( t: Teacher, v: Volunteer ): boolean
```
should NOT go under server-procedures if it doesn't
interact with the database and just checks that a volunteer's id
is included in the teacher's list of volunteer id's.

e.g. a function
```TypeScript
deleteUserFromDB( id: string ): boolean
```
should go under server-procedures because its side-effects affect
with the database.

## Format

In every file, there should be one exported function
with a name similar to that of its file's name.
e.g. add-user-to-db.ts has one exported function named addUserToDB.ts

The exported function can have helper functions, but these
shouldn't be exported and should "belong here".
See the "What Belongs Here" section.