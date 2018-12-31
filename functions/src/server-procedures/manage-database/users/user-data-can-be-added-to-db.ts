import * as admin from 'firebase-admin';
import {
  UserData, UserType, userDataIsCoherent
} from '../../../common-modules/database-entries/module';
import {
  Reason,
  createValidatorWithReasons,
  createAccumulatorOfValidatorsWithReasons
} from './../../../common-modules/general/module';

// Global constant necessary for interacting with database.
const db: admin.database.Database = admin.database();

/**
 * A function for checking that a user described by
 * a UserData object wouldn't collide with another
 * user already in the database.
 * @param x the userData to be analyzed.
 * @param returnReasonsIfFailure Specifies whether the
 * function should return false or an array of Reasons
 * explaining a failure.
 */
export const userDataIsNotAlreadyInDB = createValidatorWithReasons<UserData>(
  new Map<Reason, (x: UserData) => boolean>([
    //TODO
    [
      new Reason('user email already exists in database.'),
      ( x: UserData ) => {  }
    ]
  ])
);

/**
 * A function for checking that a new user
 * should be accepted by the database.
 * @param userData contains data representing the user.
 */
export const userDataCanBeAddedToDB = createAccumulatorOfValidatorsWithReasons<UserData>([
  // first, make sure that userData is "coherent"
  // i.e. it should be valid even if we didn't check the database.
  userDataIsCoherent
  // check that the user wouldn't be a repeat in the database
  , userDataIsNotAlreadyInDB
]);
