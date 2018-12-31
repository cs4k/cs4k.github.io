/**
 * Appends b to the end of a.
 * @param a The array that will receive b.
 * @param b Won't change.
 */
export function append( a: any[], b: any[] ): any[] {

  // edits the original a
  a.push(...b);

  return a;
}