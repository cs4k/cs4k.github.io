import { Reason } from './Reason';
import * as myArrayExts from './../my-array-extensions/module';

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