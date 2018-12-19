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
  id: string,
  userType: UserType,
  fullName: string,
  email: string
  //TODO
};