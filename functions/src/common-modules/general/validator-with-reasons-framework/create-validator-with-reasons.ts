import { Reason } from './Reason';

/**
 * A function factory to create a special kind of validator function.
 * 
 * A validator function normally returns a boolean
 * to specify whether its argument is considered valid.
 * Often, the validator function will require that the
 * argument pass of a series of tests.
 * If any of these tests fail, the validator fails.
 * 
 * We want a special validator function that will 
 * –instead of simply returning false–
 * tell us which test failed and give Reasons as to why it failed.
 * 
 * The tests and corresponding Reasons are
 * provided through the map parameter.
 * 
 * Type T determines the type of the argument
 * that the validator should take.
 * 
 * @param test_TO_reasonIfFailed a map from
 * each test function (i.e. a function with on parameter of type T)
 * to the Reason explaining why it would return false.
 * The test should take as parameters
 * the object to be tested.
 * 
 * @returns the validator function. It takes as
 * parameters an object of type T and
 * a boolean specifying whether the validator should
 * return false or an array of Reasons
 * if the object is considered invalid.
 */
export function createValidatorWithReasons<T>(
  test_TO_reasonForFailure: Map<
    ( x: T ) => boolean,
    Reason
  >
)
: // returns the validator function
  ( x: T, returnReasonsIfFailure?: boolean ) => boolean | Array<Reason>
{
  //TODO
}