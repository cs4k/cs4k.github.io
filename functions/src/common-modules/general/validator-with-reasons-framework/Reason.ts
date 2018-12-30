/**
 * A validator-with-reasons might return an array
 * of reasons to help the client understand why
 * the validator failed.
 */
export class Reason
{
  constructor(
    public readonly message: string
  )
  {}
}