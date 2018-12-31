import { UserData } from '../../../common-modules/database-entries/module';
import { userDataCanBeAddedToDB } from './user-data-can-be-added-to-db';

/**
 * A procedure for adding new users to the database.
 * Returns the id of the newly-created user.
 * If function fails, null is returned.
 * @param userData contains data representing the user.
 * Returns the id of the newly-created user.
 */
export async function addUserToDB( userData: UserData ): Promise<string|null> {
  
  //TODO

  // if userData wouldn't create a valid user
  if (! await userDataCanBeAddedToDB( userData, false ))
  {
    return null;
  }
  // else userData is valid

  
};
