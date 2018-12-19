/*
A general Express router for requests dealing
with the database.
*/

// The ExpressJS web-app framework
import * as express from 'express';
// I saw that this middleware makes it easy to work with
// forms that have multiple parts, including files.
// However, cooperation is required on the front-end.
// TODO implement this in the front-end.
import * as multer from 'multer';
// The addUserToDB procedure
import { addUserToDB } from './../../server-procedures/add-user-to-db';

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
  ( req, res ) => {
    
    //TODO use the addUserToDB procedure.
    // If the procedure returns null,
    // send an error message in res.
  }
);
