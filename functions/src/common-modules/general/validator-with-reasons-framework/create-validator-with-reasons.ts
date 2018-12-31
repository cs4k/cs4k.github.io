import { Reason } from './Reason';

/**
 * This is a function factory to create a special kind of validator function.
 * 
 * A validator function normally returns a boolean
 * to specify whether its argument is considered valid.
 * Often, the validator function will require that the
 * argument pass a series of tests (subfunctions which also return booleans).
 * If any of these tests fail, the validator fails.
 * 
 * We want a special validator function that will 
 * –instead of simply returning false–
 * tell us which test failed and give reasons for why it failed.
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

/**
 * The asynchronous version of createValidatorWithReasons.
 * See createValidatorWithReasons for details.
 * 
 * Necessary in case one of the test functions is asynchronous.
 * 
 * @param test_TO_reasonForFailure a map to
 * each test function (i.e. a function with on parameter of type T)
 * from the Reason explaining why it would return false.
 * We want to be able to map Reason -> test,
 * so it's better to make Reason the key type.
 * The test should take as parameters
 * the object to be tested.
 */
export async function createValidatorWithReasonsAsync<T>(
  test_TO_reasonForFailure: Map<
    // value: the Reason for why the test function returns false
    Reason,
    // key: a test function
    ( x: T ) => boolean | Promise<boolean>
  >
)
: // returns the validator function
  ( x: T, returnReasonsIfFailure?: boolean ) => Promise<boolean | Reason[]>
{

}

/**
 * 
 * @param x 
 * @param returnReasonsIfFailure 
 * @param result 
 * @param should_continue 
 */
function* validatorWithReasons_helper<T>(
  x: T,
  returnReasonsIfFailure: boolean,
  // return by reference using a tuple.
  // One element of type boolean or Reason[]
  result: [ boolean | Reason[] ],
  // return by reference using a tuple.
  // Should the generator continue to be called?
  should_continue: [ boolean ]
)
{
  // if a list of Reasons need to be returned,
  if ( returnReasonsIfFailure )
  {
    // then all tests must be tried,
    // and all of their reasons (if any) must be collected.

    // The result will be an array of reasons
    const reasons = result[0] = [];
    // The generator should be called for all tests,
    // so do NOT change this value.
    should_continue[0] = true;

    while ( true )
    {
      // Error will be thrown if this type isn't passed.
      const reason_testResult: [ Reason, boolean ] = yield;


    }

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
}