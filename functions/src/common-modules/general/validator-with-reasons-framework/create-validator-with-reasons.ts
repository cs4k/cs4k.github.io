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
 * We want a special validator function that will –instead of returning false–
 * tell us which test failed and give a Reason as to why it failed.
 * 
 * Type T determines the type of the argument
 * that the validatos should take.
 * 
 * The tests and corresponding Reasons are
 * provided through the map parameter.
 * 
 * @param test_TO_reasonIfFailed a map from
 * each test function (i.e. a function with on parameter of type T)
 * to the Reason explaining why it would return false.
 * The test should take as parameters
 * the object to be tested and a boolean to specify whether
 * the validator should return false or an array of reasons
 * if any of the tests fail.
 */
export function createValidatorWithReasons<T>(
  test_TO_reasonForFailure: Map<
    ( x: T, returnReasonsIfFailure?: boolean ) => boolean,
    Reason
  >
)
: ( x: T ) => boolean | Array<Reason>
{
  //TODO
}