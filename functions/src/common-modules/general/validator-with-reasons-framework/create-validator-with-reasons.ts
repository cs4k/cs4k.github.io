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
 * @param test_TO_reasonIfFailed a map to
 * each test function (i.e. a function with on parameter of type T)
 * from the Reason explaining why it would return false.
 * We want to be able to map Reason -> test,
 * so it's better to make Reason the key type.
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
    // value: the Reason for why the test function returns false
    Reason,
    // key: a test function
    ( x: T ) => boolean
  >
)
: // returns the validator function
  ( x: T, returnReasonsIfFailure?: boolean ) => boolean | Reason[]
{
  // return a function using the map parameter.
  return ( x: T, returnReasonsIfFailure = false ) => {

    // if a list of Reasons need to be returned,
    if ( returnReasonsIfFailure )
    {
      // then all tests must be tried.

      // create the list of reasons.
      const reasons: Reason[] = [];

      // for all reason-test pairs in the map parameter
      for ( const [reason,test] of test_TO_reasonForFailure )
      {
        // if this test fails
        if (!test( x ))
        {
          // then store the reason explaining its failure
          reasons.push( reason );
        }
      }

      // if we stored no reasons,
      // then all tests passed,
      // so return true.
      return reasons.length === 0 ? true : reasons;
    }
    // else we don't need a list of Reasons,
    else
    {
      // then just check whether any of the tests fail.

      // for all reason-test pairs in the map parameter
      for ( const [reason,test] of test_TO_reasonForFailure )
      {
        // if any test fails,
        if (!test( x ))
        {
          // then return false immediately.
          return false;
        }
      }

      // only return true if no test fails.
      return true;
    }
  };
}