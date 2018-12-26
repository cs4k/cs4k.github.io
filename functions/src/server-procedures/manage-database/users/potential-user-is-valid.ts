import * as admin from 'firebase-admin';
import { UserData, UserType } from '../../../common-modules/database-entry-interfaces/module';

// Global constant necessary for interacting with database.
const db: admin.database.Database = admin.database();

/**
 * A procedure for checking that a new user
 * would be valid if added to the database.
 * @param userData contains data representing the user.
 */
export function potentialUserIsValid( userData: UserData ): boolean {

  //TODO
  
  // type of user (e.g. Teacher, Volunteer)
  const { userType } = userData;

  // reference to folder of users.
  const usersFolderRef = db.ref('users');



  /*
  Check the database to ensure that the
  potential user wouldn't collide with another user.
  */

};