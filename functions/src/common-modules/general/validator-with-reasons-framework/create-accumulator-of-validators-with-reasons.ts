import { Reason } from './Reason';
import * as myArrayExts from './../my-array-extensions/module';

// TODO write asynchronous version of createAccumulatorOfValidatorsWithReasons

/**
 * See createValidatorWithReasons for details required to understand this.
 * 
 * This is a function factory for an
 * "accumulator of validators with reasons" that
 * uses other "validators with reasons" as its "tests".
 * 
 * @param subvalidators An array of validators with reasons
 * as created by the createValidatorWithReasons factory function.
 * 
 * @returns a validator with reasons. 
 * 
 * If none of the accumulator's subvalidators fail, then
 * the accumulator returns true.
 * 
 * If any of the accumulator's subvalidators fail
 * and returnReasonsIfFailure is passed as false,
 * then the accumulator will return false.
 * 
 * if any of the accumulator's subvalidators fail
 * and returnReasonsIfFailure is passed as true,
 * then the accumulator will accumulate all of the reasons
 * returned by failing subvalidators.
 */
export function createAccumulatorOfValidatorsWithReasons<T>(
  // an array of other validator functions.
  subvalidators: (
    // The validator function type.
    ( x: T, returnReasonsIfFailure?: boolean ) => boolean | Reason[]
  )[]
)
: ( x: T, returnReasonsIfFailure?: boolean ) => boolean | Reason[]
{
  // Ensure that array is not empty so that
  // the for-loop below executes once/more.
  ASSERT_nonemptyArrayParameter(
    subvalidators,
    createAccumulatorOfValidatorsWithReasons.name
  );

  return ( x: T, returnReasonsIfFailure = false ) => {
    
    // a generator to be used by shared by the synchronous and asynchronous
    // versions of this function
    const gen = accumulatorOfValidatorsWithReasons_generatorHelper(
      x,
      returnReasonsIfFailure
    );
    
    // The current return value of gen.next(), initially set to undefined.
    // Must be declared outside of for-loop.
    let current: undefined | IteratorResult<boolean|Reason[]> = undefined;

    for ( const subvalidator of subvalidators )
    {
      current = gen.next(subvalidator( x ));

      // if the generator is done,
      if ( current.done )
      {
        // then return the current value
        return current.value;
      }
    }

    // current should not be undefined if the for-loop executed once/more.
    // for-loop should execute once/more if the array is not empty.
    // Assertion at beginning of function ensured that.
    return ( current as IteratorResult<boolean|Reason[]> ).value;
  };
}

export function createAccumulatorOfValidatorsWithReasonsAsync<T>(
  // an array of other validator functions.
  subvalidators: (
    // The validator function type.
    ( x: T, returnReasonsIfFailure?: boolean )
    => boolean | Reason[] | Promise<boolean|Reason[]>
  )[]
)
: // the validator function type
  ( x: T, returnReasonsIfFailure?: boolean ) => Promise<boolean|Reason[]>
{
  // TODO
}


/**
 * The synchronous and asynchronous versions of the
 * createAccumulatorOfValidatorsWithReasons*
 * function factories are mostly the same.
 * They only differ in how the test functions are evaluated.
 * 
 * Hence, this is a helper which implements the similar part of
 * their algorithm.
 * 
 * next().done simultaneously tells client whether the generator needs to
 * be called again and whether the client should return next().value.
 * 
 * IMPORTANT: This generator expects a boolean or Reason[] to be passed
 * to its next() method containing the return value of one subvalidator.
 * 
 * This generator function shouldn't be exported. It does not stand on
 * its own, and it only serves to prevent code rewriting
 * in the other two functions.
 * @param x 
 * @param returnReasonsIfFailure 
 */
function* accumulatorOfValidatorsWithReasons_generatorHelper<T>(
  x: T,
  returnReasonsIfFailure: boolean
) : IterableIterator< boolean | Reason[] >
{
  // The validator returns true until any of the tests fail,
  // so its result should initially be set to true.
  let result: boolean | Reason[] = true;

  // if a list of Reasons needs to be returned,
  if ( returnReasonsIfFailure )
  {
    // then all subvalidators must be processed,
    // and all of their reasons (if any) must be collected.

    // infinite loop
    while ( true )
    {
      // yeild will return the argument passed to next().
      // Error should be thrown if the expected argument isn't passed.
      // We expect the result of one subvalidator.
      // A single subvalidator will return either
      // true or an array of reasons explaining why it failed.
      const subvalidatorResult: boolean | Reason[] = yield result;

      // if subvalidatorResult is a Reason[]
      if ( typeof subvalidatorResult !== 'boolean' )
      {
        // then collect reasons.

        // if the result is still a boolean
        if ( typeof result === 'boolean' )
        {
          // then convert it to Reason[]
          result = [];
        }

        // collect reasons.
        myArrayExts.append( result, subvalidatorResult );
      }
      else if ( subvalidatorResult === false )
      {
        throw Error(`
        ${accumulatorOfValidatorsWithReasons_generatorHelper.name}:
        This point should not be reached. Either returnReasonsIfFailure
        parameter should have been false, or false was incorrectly passed
        to next().
        `);
      }
      // else subvalidatorResult === true,
      // then do nothing.
    }
  }
  // else we don't need a list of reasons
  else
  {
    // then just check whether any of the tests fail.

    while ( result )
    {
      // yeild will return the argument passed to next().
      // Error should be thrown if the expected argument isn't passed.
      // We expect the result of one subvalidator.
      const subvalidatorResult: boolean = yield result;

      // if the subvalidator failed,
      if ( !subvalidatorResult )
      {
        // then fail the accumulator
        result = false;
      }
    }
  }
}

function ASSERT_nonemptyArrayParameter( 
  array: any[],
  function_name: string
): void
{
  if ( array.length === 0 )
  {
    throw Error(
      `${function_name}: an empty map was passed.`
    );
  }
}