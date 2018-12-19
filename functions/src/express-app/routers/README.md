# routers

## description

This folder holds the routers assigned by app.ts
to handle requests starting with certain url's.

## format

Ideally, a router file should be named after the url
it's assigned to.
e.g. the router for '/database' should be in database.ts.

However, the router's url is assigned in
app.ts, so the router doesn't even know what its url is.