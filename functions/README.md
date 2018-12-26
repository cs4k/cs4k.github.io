# Firebase Cloud Functions

## Description

This directory defines the **Cloud Functions** for our Firebase back-end.

It should __NOT__ interact with the other folders.
It should be totally encapsulated from other folders.

The Cloud Functions essentially make up the server of
a Firebase project. Cloud Functions can do anything
that an ordinary Node.js server program can do. In fact,
the Cloud Functions are basically a simplified version of
a traditional Node.js server.

The functions are written in TypeScript.

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