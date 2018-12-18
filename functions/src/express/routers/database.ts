/*
A general Express router for requests dealing
with the database.
*/

import { createUser } from './../../procedures/create-user';

// The ExpressJS web-app framework
import * as express from 'express';

// Create an Express router to export.
export const router: express.Router = express.Router();

/**
 * This url deals with the creation of users,
 * both teachers and volunteers.
 */
router.post(
  // url suffix that triggers this handler.
  '/create-user',
  // handler function.
  async ( _req, _res ) => {
    
    try
    {
      // The createUser function should return the 
      // request and response objects, which you can act upon.
      const [ req, res ] = await createUser(_req,_res);

      //TODO
      // send back success in res
    }
    catch ( error )
    {
      //TODO
      // send _res back with an error message
    }
  }
);
