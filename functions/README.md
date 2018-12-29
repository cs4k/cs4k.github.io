# Firebase Cloud Functions

## Description

This directory defines the **Cloud Functions** for our Firebase back-end.

It should **NOT** interact with the other folders.
It should be totally encapsulated from other folders.

The Cloud Functions essentially make up the server of
a Firebase project. Cloud Functions can do anything
that an ordinary Node.js server program can do. In fact,
the Cloud Functions are basically a simplified version of
a traditional Node.js server.

The code is written in the **TypeScript** programming language.
We chose TypeScript over JavaScript for two reasons:\
1) Firebase's version of TypeScript is much more advanced than its version of JavaScript.
This allows for more powerful capabilities.\
2) TypeScript is a superset of JavaScript which allows for static typing.
This makes allows our code editor to annotate our code more with more detail.

## Table of Contents for files outside src/

The src directory contains all of our source code.

However, there are some files outside src.

### style-guide.md

This file explains how code and files should be organized.

### package.json, package-lock.json, node_modules/

These organize the third-party Node.js modules we're using.

### tsconfig.json

Specifies the settings for how our TypeScript code should be interpreted.
e.g. TypeScript version, what version of JavaScript it should be transpiled to.

This was given to us by Firebase. It may not be wise to change settings
because Firebase may not be able to accomodate our customized settings.

e.g. We may ask for a version of TypeScript/JavaScript that Firebase doesn't have.

If we edit this file, we need to edit tslint.json to ensure that the linter
and transpiler agree on interpreting the code.

### tslint.json

Specifies how our code should be linted.
The linter is used by our code editor to flag potential/actual errors.

## Table of Contents for src/

All of our source code is under src directory.

Further descriptions for the individual subfolders can be found in
their README files.

The third-party Node.js modules installed for this project
are under the node_modules directory.

### src/index.ts

The starting point of our back-end.

Immediately redirects requests to the Express app.

### src/express-app

Holds the code for the Express app which is essentially our back-end.

As previously mentioned, the Cloud Functions are basically a
simplified Node.js server. Hence, we'll use the widely-used
Express.js framework writing for our server.

The code in this folder *drives* the rest of the code.

### src/server-procedures

The bulk of the Express app's work consist of routines written in this folder.

This code is separated from the express-app for the sake of organization.

### src/common-modules

Modules we've written to be used by the rest of the source code.