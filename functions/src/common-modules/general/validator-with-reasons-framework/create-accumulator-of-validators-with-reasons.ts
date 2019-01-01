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
  return ( x: T, returnReasonsIfFailure = false ) => {
    //TODO
    
    if ( returnReasonsIfFailure )
    {
      let reasons: Reason[] = [];

      for ( const subvalidator of subvalidators )
      {
        let result: boolean | Reason[] = subvalidator(
          x, true
        );
        
        // if result is a Reason[]
        if ( typeof result !== "boolean" )
        {
          // then collect the reasons

          myArrayExts.append( reasons, result );
        }
      }

      // only return reasons if 
      return reasons.length == 0 ? true : reasons;
    }
    else
    {
      for ( const subvalidator of subvalidators )
      {
        // if any subvalidator fails,
        if (!subvalidator( x, false ))
        {
          // then immediately return false.
          return false;
        }
      }

      return true;
    }
  };
}

/**
 * TODO write description
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