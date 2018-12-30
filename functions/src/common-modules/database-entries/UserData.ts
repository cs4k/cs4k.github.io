import * as validator from 'validator';
import {
  createValidatorWithReasons,
  Reason
} from './../general/validator-with-reasons-framework/module';

/**
 * An enum for identifying different types of users.
 * 
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
  
  // Do NOT add an id property. It shouldn't be part of UserData.
  // Why?
  // 1) Just like any object in the database or a JSON field,
  // a UserData field does NOT contain its own key.
  // 2) The front-end will send us a UserData object when requesting 
  // a new user to be added. The front-end won't be able to include an id
  // because the id is assigned by the database on the back-end.
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
 * There should be limits on the possible property values of
 * a UserData object.
 * e.g. firstName shouldn't be 200 characters long.
 */
export const UserDataPropertyLimits = Object.freeze({
  firstName: {
    min_length: 1,
    max_length: 25
  },
  lastName: {
    min_length: 0,
    max_length: 25
  }
});

/**
 * Checks that the fields of a UserData object are coherent.
 * e.g. checks that the email field doesn't have two '@' characters.
 * 
 * Created using our "Validator With Reasons" framework.
 * @param userData 
 * @param returnReasonsIfNotCoherent if true, then function returns the 
 * an array of Reasons explaining why the function returned false.
 */
export const userDataIsCoherent = createValidatorWithReasons<UserData>(
  new Map<Reason, (x: UserData) => boolean>([
    [
      // a Reason explaining why the test function would fail
      new Reason(
        `UserData.prototype.firstName property must only have alphabetic characters`
      ),
      // a test function
      ( x: UserData ) => { return validator.isAlpha(x.firstName); }
    ],
    [
      new Reason(
        'UserData.prototype.firstName property must have length within'
        // + '[min,max]'
        + `[${UserDataPropertyLimits.firstName.min_length},${UserDataPropertyLimits.firstName.max_length}]`
      ),
      ( x: UserData ) => {
        return UserDataPropertyLimits.firstName.min_length
          <= x.firstName.length 
          && x.firstName.length
          <= UserDataPropertyLimits.firstName.max_length;
      }
    ],
    [
      new Reason(
        'UserData.prototype.lastName property must only have alphabetic characters'
      ),
      ( x: UserData ) => { return validator.isAlpha(x.lastName); }
    ],
    [
      new Reason(
        'UserData.prototype.lastName property must have length within'
        // '[min,max]'
        + `[${UserDataPropertyLimits.lastName.min_length },${UserDataPropertyLimits.lastName.max_length}]`
      ),
      ( x: UserData ) => {
        return UserDataPropertyLimits.lastName.min_length
          <= x.lastName.length 
          && x.lastName.length
          <= UserDataPropertyLimits.lastName.max_length;
      }
    ]
  ])
);