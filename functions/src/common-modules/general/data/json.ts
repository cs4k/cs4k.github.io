// Some general functions related to json

/**
 * Strict version of the JSON.stringify function.
 * If obj cannot be fully converted into an object,
 * then null is returned.
 * @param obj
 */
export function to_json_or_null( obj: object ): string | null
{
  try
  {
    return JSON.stringify(
      obj,
      // replacer function to be called if there is
      // a value which cannot be converted to json
      ( key: string, value: any ) => {
        throw Error('');
      }
    );
  }
  catch ( error )
  {
    return null;
  }
}