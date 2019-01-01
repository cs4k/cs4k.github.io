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
  // Ensure that map is not empty so that
  // the for-loop below executes once/more.
  ASSERT_nonemptyMapParameter(
    test_TO_reasonForFailure,
    createValidatorWithReasons.name
  );

  return ( x: T, returnReasonsIfFailure = false ) => {

    // a generator to be used by shared by the synchronous and asynchronous
    // versions of this function
    const gen = validatorWithReasons_generatorHelper(
      x,
      returnReasonsIfFailure
    );
    
    // The current return value of gen.next(), initially set to undefined.
    // Must be declared outside of for-loop.
    let current: undefined | IteratorResult<boolean|Reason[]> = undefined;
    
    // for all reason-test pairs in the map parameter
    for ( const [reason,test] of test_TO_reasonForFailure )
    {
      current = gen.next([ reason, test(x) ]);

      // if the generator is done,
      if ( current.done )
      {
        // then return the current value.
        return current.value;
      }
    }
    
    // current should not be undefined if the for-loop executed once/more.
    // for-loop should execute once/more if the map is not empty.
    // Assertion at beginning of function ensured that.
    return ( current as IteratorResult<boolean|Reason[]> ).value;
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
: // returns a promise containing the validator function
  Promise<
    // The asynchronous validator function type.
    ( x: T, returnReasonsIfFailure?: boolean ) => Promise<boolean|Reason[]>
  >
{
  // Ensure that map is not empty so that
  // the for-loop below executes once/more.
  ASSERT_nonemptyMapParameter(
    test_TO_reasonForFailure,
    createValidatorWithReasonsAsync.name
  );
  
  return async ( x: T, returnReasonsIfFailure = false ) => {

    // a generator to be used by shared by the synchronous and asynchronous
    // versions of this function
    const gen = validatorWithReasons_generatorHelper(
      x,
      returnReasonsIfFailure
    );
    
    // The current return value of gen.next(), initially set to undefined.
    // Must be declared outside of for-loop.
    let current: undefined | IteratorResult<boolean|Reason[]> = undefined;
    
    // for all reason-test pairs in the map parameter
    for ( const [reason,test] of test_TO_reasonForFailure )
    {
      current = gen.next([ reason, await test(x) ]);

      // if the generator is done,
      if ( current.done )
      {
        // then return the current value.
        return current.value;
      }
    }

    // current should not be undefined if the for-loop executed once/more.
    // for-loop should execute once/more if the map is not empty.
    // Assertion at beginning of function ensured that.
    return ( current as IteratorResult<boolean|Reason[]> ).value;
  };
}

/**
 * The synchronous and asynchronous versions of the createValidatorWithReasons*
 * function factories are mostly the same.
 * They only differ in how the test functions are evaluated.
 * 
 * Hence, this is a helper which implements the similar part of
 * their algorithm.
 * 
 * next().done simultaneously tells client whether the generator needs to
 * be called again and whether the client should return next().value.
 * 
 * IMPORTANT: This generator expects a tuple [ Reason, boolean ] to be passed
 * to its next() method containing the result of one test function and
 * the Reason behind its possible failure.
 * 
 * This generator function shouldn't be exported. It does not stand on its own,
 * and it only serves to prevent code rewriting in the other two functions.
 * 
 * @param x The item to be validated.
 * @param returnReasonsIfFailure Which should be returned in case of failure:
 * false of an array of reasons?
 */
function* validatorWithReasons_generatorHelper<T>(
  x: T,
  returnReasonsIfFailure: boolean
) : IterableIterator<boolean|Reason[]>
{
  // The validator returns true until any of the tests fail,
  // so its result should initially be set to true.
  let result: boolean | Reason[] = true;

  // if a list of Reasons needs to be returned,
  if ( returnReasonsIfFailure )
  {
    // then all tests must be processed,
    // and all of their reasons (if any) must be collected.

    // infinite loop
    while ( true )
    {
      // yeild will return the argument passed to next().
      // Error should be thrown if the expected argument isn't passed.
      // We expect the Reason and the result of its associated test.
      const reason_testResult: [ Reason, boolean ] = yield result;

      // if testResult === false
      if (!reason_testResult[ 1 ])
      {
        // if the result is still a boolean
        if ( typeof result === 'boolean' )
        {
          // then convert it to Reason[]
          result = [];
        }

        // store the reason.
        result.push( reason_testResult[0] );
      }
      // else testResult === true,
      // then do nothing. 
    }
  }
  // else we don't need a list of Reasons,
  else
  {
    // then just check whether any of the tests fail.

    // continue until the validator fails.
    while ( result )
    {
      // yeild will return the argument passed to next().
      // Error should be thrown if the expected argument isn't passed.
      // We expect the Reason and the result of its associated test.
      const reason_testResult: [ Reason, boolean ] = yield result;

      // if testResult == false,
      if (!reason_testResult[ 1 ])
      {
        // then fail the validator.
        result = false;

        // ignore the reason.
      }
    }
  }
}

function ASSERT_nonemptyMapParameter( 
  map: Map<any,any>,
  function_name: string
): void
{
  if ( map.size === 0 )
  {
    throw Error(
      `${function_name}: an empty map was passed.`
    );
  }
}