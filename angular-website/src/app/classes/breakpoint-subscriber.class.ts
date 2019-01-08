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

  public readonly deviceBreakpointsDescending = Object.freeze([
    Breakpoints.Web, Breakpoints.Tablet, Breakpoints.Handset
  ]);

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  getCurrentDeviceBreakpoint(): string {

    for ( const break_pt of this.deviceBreakpointsDescending ) {
      if (this.breakpointObserver.isMatched( break_pt )) {
        return break_pt;
      }
    }

    // if this goes below the lowest breakpoint,
    // then just return the lowest breakpoint.
    return this.deviceBreakpointsDescending[
      this.deviceBreakpointsDescending.length - 1
    ];
  }

  setDeviceTransitionCallbacks(
    toHandset: null | (() => void),
    toTablet: null | (() => void),
    toWeb: null | (() => void)
  ): void {

    const self = this.setDeviceTransitionCallbacks;

    // SECTION: set static variables

    const _calledBefore = 'calledBefore';

    if (!self[_calledBefore]) {

      this.activeSubscriptions.push(
        this.breakpointObserver.observe(
          // copy the ReadonlyArray into a string[]
          this.deviceBreakpointsDescending.slice()
        ).subscribe(( next: BreakpointState ) => {
          // TODO
        })
      );

      self[_calledBefore] = true;
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
