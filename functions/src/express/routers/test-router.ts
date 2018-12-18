// The ExpressJS web-app framework
import * as express from 'express';

export const router: express.Router = express.Router();

router.post(
  // url suffix that triggers this handler.
  // '/' means that no suffix.
  '/',
  // handler
  ( req, res ) => {
    
    

    // no need to respond
    res.end();
  }
);