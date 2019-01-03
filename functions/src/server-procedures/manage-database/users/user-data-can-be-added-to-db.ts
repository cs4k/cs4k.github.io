import {
  UserData,
  userDataIsCoherent
} from '../../../common-modules/database-entries/module';
import {
  Reason,
  createValidatorWithReasons,
  createValidatorWithReasonsAsync,
  createAccumulatorOfValidatorsWithReasons,
  createAccumulatorOfValidatorsWithReasonsAsync
} from './../../../common-modules/general/module';
import {
  usersRef
} from './../../../common-modules/database-entries/module';

/**
 * A function for checking that a user described by
 * a UserData object wouldn't collide with another
 * user already in the database.
 * @param x the userData to be analyzed.
 * @param returnReasonsIfFailure Specifies whether the
 * function should return false or an array of Reasons
 * explaining a failure.
 */
export const userDataIsNotAlreadyInDB =
createValidatorWithReasonsAsync<UserData>(
  new Map<
    Reason,
    (x: UserData) => boolean | Promise<boolean>
  >
  ([
    [
      // Users shouldn't be allowed to share emails.
      new Reason(
        'There is already another user with that email.'
      ),
      async ( x: UserData ) => {
        // query for any users with
        // the same email as x.
        const query_result = await usersRef.
          orderByChild('email').
          equalTo( x.email ).
          once('value');

        // The test passes only if
        // the query returned nothing.
        // i.e. if its value doesn't exist.
        return !query_result.exists();
      }
    ]
  ])
);

/**
 * A function for determining whether a new user
 * should be accepted by the database.
 * @param userData contains data representing the user.
 */
export const userDataCanBeAddedToDB =
createAccumulatorOfValidatorsWithReasonsAsync([
  userDataIsCoherent,
  userDataIsNotAlreadyInDB
]);