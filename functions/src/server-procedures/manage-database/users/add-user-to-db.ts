import { UserData } from '../../../common-modules/database-entries/module';
import { userDataCanBeAddedToDB } from './user-data-is-acceptable';

/**
 * A procedure for adding new users to the database.
 * Returns the id of the newly-created user.
 * If function fails, null is returned.
 * @param userData contains data representing the user.
 * Returns the id of the newly-created user.
 */
export function addUserToDB( userData: UserData ): string | null {

  //TODO

  // if userData wouldn't create a valid user
  if (!userDataCanBeAddedToDB( userData ))
  {
    return null;
  }
  // else userData is valid

  
};
