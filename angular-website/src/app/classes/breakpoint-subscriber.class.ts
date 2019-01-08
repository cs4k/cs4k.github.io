import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

// NOTE:
// This class was created manually by hand because the angular cli kept giving
// the "Tree type is not supported" error.

/**
 * A class to simplify the process of subscribing to a BreakpointObserver
 * and reacting to changes in window dimensions.
 *
 * IMPORTANT before destroying, the unsubscribe method must be called to
 * prevent memory leaks.
 */
export class BreakpointSubscriber {

  private activeSubscriptions: Subscription[];

  /**
   * map from a breakpoint property name to the respective callbacks.
   */
  private breakpoint_TO_callbacks: Map<
    string,
    { greaterEqual: () => void, lessThan: () => void }
  > = new Map<
    string,
    { greaterEqual: () => void, lessThan: () => void }
  >();

  constructor( private breakpointObserver: BreakpointObserver ) {

    // this.activeSubscriptions =
    // breakpointObserver.observe([
    //   Breakpoints.Handset,
    //   Breakpoints.Tablet,
    //   Breakpoints.Web
    // ])
    // .subscribe(( value: BreakpointState ) => {
    // });
  }

  setBreakpointCallbacks(
    breakpoints_TO_callbacks: Map<
      string,
      {
        greaterEqualCallback: null | (() => void),
        lessThanCallback: null | (() => void),
        callback?: undefined
      }
      | {
        greaterEqualCallback?: undefined,
        lessThanCallback?: undefined,
        callback: null | (( _: BreakpointState  ) => void)
      }
    >
  ): void {

    // SECTION: breakpoint validation

    for ( const [breakpoint, callbacks] of breakpoints_TO_callbacks ) {

      this.activeSubscriptions.push(
        this.breakpointObserver.observe( breakpoint ).subscribe(
          ( breakpointState: BreakpointState ) => {

            if ( callbacks.callback ) {
              callbacks.callback( breakpointState );
            }

            if ( breakpointState.matches && callbacks.greaterEqualCallback ) {
              callbacks.greaterEqualCallback();
            }

            if ( !breakpointState.matches && callbacks.lessThanCallback ) {
              callbacks.lessThanCallback();
            }
          }
        )
      );
    }
  }

  ifBreakpoint(
    breakpoint: string,
    greaterEqualCallback: null | (() => void),
    lessThanCallback: null | (() => void)
  ): void {

    const self = this.ifBreakpoint;

    // SECTION: validate parameters

    // if the given breakpoint property name doesn't exist,
    if ( !Breakpoints[breakpoint] ) {
      throw Error(
        'breakpoint not incuded in @angular/cdk/layouts Breakpoints'
      );
    }

    // SECTION: define static variables

    // A map from a breakpoint property name to the respective callbacks.
    const _breakpoint_TO_callbacks = 'breakpoint_TO_callbacks';

    // if the static variable hasn't been defined yet,
    if (!self[_breakpoint_TO_callbacks]) {

      // then define it for the first time.
      Object.defineProperty(
        // assign it to this function
        self,
        // property name
        _breakpoint_TO_callbacks,
        {
          configurable: false,
          enumerable: false,
          writable: false,
          value: new Map<
            string,
            { greaterEqual: null | (() => void), lessThan: null | (() => void) }
          >()
        }
      );
    }

    const breakpoint_TO_callbacks:  Map<
      string,
      { greaterEqual: null | (() => void), lessThan: null | (() => void) }
    > = self[ _breakpoint_TO_callbacks ];

    // SECTION:


    // if this breakpoint hasn't been added to the map,
    if (!this.breakpoint_TO_callbacks.has( breakpoint )) {

      this.activeSubscriptions.push(
        this.breakpointObserver.observe( breakpoint ).subscribe(
          ( breakpointState: BreakpointState ) => {

            const callbacks = this.breakpoint_TO_callbacks.get( breakpoint );

            if (!callbacks) {
              console.error(
                `logic error: ${breakpoint} entry got deleted from map.`
              );
              return;
            }

            const { greaterEqual, lessThan } = callbacks;

            if (this.breakpoint_TO_callbacks.has( breakpoint )) {
              const {
                greaterEqual,
                lessThan
              } = this.breakpoint_TO_callbacks.get( breakpoint );
            }

            if ( breakpointState.matches ) {
              if ( greaterEqualCallback ) {
                greaterEqualCallback();
              }
            } else {
              if ( lessThanCallback ) {
                lessThanCallback();
              }
            }
          }
        )
      );
    }
  }

  reactToBreakpointGreaterEqual( breakpoint: string, callback: (() => void) ) {

    if ( !Breakpoints[breakpoint] ) {
      throw Error('Breakpoint non-existent');
    }


  }

  /**
   * IMPORTANT Before destroying this object, the unsubscribe method should
   * be called to prevent memory leaks.
   */
  unsubscribe(): void {

    // prevent memory leaks by unsubscribing.
    for ( const sub of this.activeSubscriptions ) {
      sub.unsubscribe();
    }
  }
}
