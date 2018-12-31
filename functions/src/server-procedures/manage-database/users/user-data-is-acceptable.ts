import * as admin from 'firebase-admin';
import { UserData, UserType } from '../../../common-modules/database-entries/module';

// Global constant necessary for interacting with database.
const db: admin.database.Database = admin.database();

/**
 * A function for checking that a new user
 * should be accepted by the database.
 * @param userData contains data representing the user.
 */
export function userDataIsAcceptable( userData: UserData ): boolean {

  //TODO
  
  // first, make sure that userData is coherent
  // i.e. would it be valid if we didn't check the database?

  

  // type of user (e.g. Teacher, Volunteer)
  const { userType } = userData;

  // reference to folder of users.
  const usersFolderRef = db.ref('users');

  

  /*
  Check the database to ensure that the
  potential user wouldn't collide with another user.
  */

};