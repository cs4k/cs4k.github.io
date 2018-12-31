import * as admin from 'firebase-admin';

// Reference to the database
export const database: admin.database.Database = admin.database();

// Reference to the users folder.
export const usersRef: admin.database.Reference = database.ref('users');