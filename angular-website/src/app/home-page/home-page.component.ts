import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  private matchingBreakpoints: Map< BreakpointState, boolean >;
  // used by ngOnDestroy to unsubscribe
  private activeSubscriptions: Subscription[];


  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    // IMPORTANT make sure to unsubscribe observables
    // in ngOnDestroy to prevent memory leaks!

    // push Subscriptions onto activeSubscriptions
    // so that ngOnDestroy can easily unsubscribe them later.
    this.activeSubscriptions.push(...[

      // subscribe to changes in screen dimensions
      this.breakpointObserver.observe([
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web
      ])
      .subscribe(
        // next-observer.
        ( value: BreakpointState ) => {

          for ( const breakpoint of this.matchingBreakpoints ) {

          }
        }
      )

    ]);

    // a.push(...b);
  }

  ngOnDestroy() {

    // prevent memory leaks by unsubscribing from all subscriptions.
    this.activeSubscriptions.forEach(( value: Subscription ) => {
      value.unsubscribe();
    });
  }
}
