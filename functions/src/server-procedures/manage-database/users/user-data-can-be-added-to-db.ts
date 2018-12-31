import * as admin from 'firebase-admin';
import {
  UserData,
  UserType,
  userDataIsCoherent
} from '../../../common-modules/database-entries/module';
import {
  Reason,
  createValidatorWithReasons,
  createAccumulatorOfValidatorsWithReasons
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
export async function userDataIsNotAlreadyInDB(
  x: UserData, returnReasonsIfFailure?: boolean
)
{
  // Users shouldn't be allowed to share emails.
  // Test whether userData has an email already in the database.
  // Unfortunately, the database query requires that this be an
  // asynchronous function.
  async function test_email_repeat( _x: UserData )
  {
    // query for any users with
    // the same email as x.
    const query_result = await usersRef.
      orderByChild('email').
      equalTo( _x.email ).
      once('value');

    return ( _: UserData ) => {
      // x is unused here because it was already
      // used to create query_result.
      // However, the createValidatorWithReasons function
      // expects that parameter type.

      // The test passes only if
      // the query returned nothing.
      // i.e. if its value doesn't exist.
      return !query_result.exists();
    };
  }

  // Calling the createValidatorWithReasons function factory
  // to create a one-time function call is inefficient.
  // However, the only other option I see would require
  // a lot of code rewriting.
  // This is because test_email_repeat is asynchronous,
  // so createValidatorWithReasons cannot directly take it.
  // The await operator is needed, which requires that this
  // entire function be considered asynchronous.
  return createValidatorWithReasons<UserData>(
    new Map<Reason, (x: UserData) => boolean>([
      [
        new Reason(
          'There is already another user with that email.'
        ),
        // await for the function to be returned
        await test_email_repeat( x )
      ]
    ])
  )( x, returnReasonsIfFailure );
};

/**
 * A function for checking that a new user
 * should be accepted by the database.
 * @param userData contains data representing the user.
 */
export async function userDataCanBeAddedToDB(
  x: UserData, returnReasonsIfFailure?: boolean
): Promise< boolean | Reason[] >
{
  // The createAccumulatorOfValidatorsWithReasons factory function
  // cannot take asynchronous functions as parameters.
  // Therefore, let's collect the would-be results of these asynchronous
  // functions so that we can later put them into dummy synchronous functions.

  const result_userDataIsNotAlreadyInDB = await userDataIsNotAlreadyInDB(
    x, returnReasonsIfFailure
  );
  
  // Calling the createAccumulatorOfValidatorsWithReasons
  // function factory to create a one-time function call is inefficient.
  // However, the only other option I see would require
  // a lot of code rewriting.
  return createAccumulatorOfValidatorsWithReasons<UserData>([
    // first, make sure that userData is "coherent"
    // i.e. it should be valid even if we didn't check the database.
    userDataIsCoherent,
    // a dummy synchronous function to stand in for userDataIsNotAlreadyInDB
    ( _1: UserData, _2 = false ) => {
      return result_userDataIsNotAlreadyInDB;
    }
  ])( x, returnReasonsIfFailure );
}