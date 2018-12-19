# express-app

## Description

This folder holds the code for the "server" Express App.

While Firebase doesn't call its back-end a "server",
it's useful to think of our back-end as a server.
This is especially true because the Express framework
is a server framework.

An Express App is a essentially a server program.
It only exists on the back-end.

## Explanation

Imagine a tree.
The firebase http onRequest function is at the root.
The Express App (implemented in app.ts) is right below the root.
The Express Routers (implemented in routers/) are below the express app.
Unless I'm mistaken, a router can redirect to another router,
so there can be many levels of routers.
Hence, the tree metaphor is quite appropriate.

### HTTP Requests

Our server is going to be fed messages known as **http requests**.
These requests come with text, files, and anything the front-end
website needs to describe what it needs.

The only commonly used http request methods are GET, POST, PUT, DELETE.
To my understanding, they have few differences besides their name.
They can carry the same information and it's up to you to decide how
you want to reac to them.

e.g. If the front-end wants to create a new user,
it might send us a request with text about the user's info
plus a profile picture.

### HTTP Requests and the Tree

All requests immediately get redirected to the Express App.
This happens in index.ts.

The Express App normally redirects requests down to routers based on url substring.
(The App can directly respond to requests, but this gets messy,
so it's better to redirect to routers)
e.g. Imagine a router called testRouter assigned to "/testing".
Such a router would receive requests to url's like
www.ourwebsite.org/testing/...

A router can respond directly to requests by url and method.
It does this by assigning a handler function to a combination of
url and request method.
e.g. The testRouter can handle POST requests for "/unit-testing".
The handler function it creates would deal with POST requests to url's like
www.ourwebsite.org/testing/unit-testing/...

If I'm not mistaken, routers can redirect again to other routers
in exactly the same way as the app did to routers.

In this way, requests flow down the tree until they hit a leaf node,
which is a handler function.