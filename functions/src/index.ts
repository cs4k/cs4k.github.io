// the Firebase Functions module
import * as functions from 'firebase-functions';
// my express app
import { app } from './express-app/app.js';

/*
Redirect all https requests to the express app.
There should be very little code here.
This should simply redirect to our express app defined elsewhere.
*/
exports.express = functions.https.onRequest(( request, response ) => {

  if ( !request.path )
  {
    // necessary, according to
    // https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c
    // prepend '/' to keep query params, if any
    request.url = `/${request.url}`
  }
  
  return app( request, response );
});
