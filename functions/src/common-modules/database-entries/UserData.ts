import * as validator from 'validator';
import { user } from 'firebase-functions/lib/providers/auth';

/*
An enum for identifying different types of users.
 */
export enum UserType {
  Volunteer = "Volunteer",
  Teacher = "Teacher"
};

/**
 * The base interface for plain objects holding
 * the data for a user.
 */
export interface UserData {
  
  // The id is NOT part of UserData.
  // Just like any object in the database or a JSON field,
  // a UserData field does NOT contain its own key.
  // The front-end will send us a UserData object when requesting 
  // a new user to be added.
  // It cannot include an id because the id is assigned
  // by the database on the back-end.
  // id: string,

  userType: UserType,
  
  // It may be simpler to separate first & last names
  // instead of having a fullName property.
  // Some people may insist (eye-roll) on having multiple last names.
  firstName: string,
  lastName: string,
  
  email: string
  //TODO
};

/**
 * Checks that the fields of a UserData object are coherent.
 * e.g. checks that the email field doesn't have two '@' characters.
 * @param userData 
 * @param returnReasonsIfNotCoherent if true, then function returns the 
 * an array of string messages explaining why the function returned false.
 */
export function userDataIsCoherent(
  userData: UserData, returnReasonsIfNotCoherent = false
) : boolean | string[]
{
  // Note: Extra fields are considered ok.

  return
    validator.isAlpha( userData.firstName )
    && validator.isAlpha( userData.lastName )
    && string_length_limits_respected( userData );
  
  function string_length_limits_respected( user_data: UserData ): boolean
  {
    let default_length_limit = 50;

    return user_data.firstName.length < 
  }

  //TODO
}

