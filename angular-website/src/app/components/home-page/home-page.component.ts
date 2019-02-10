// import {
//   BreakpointSubscriber
// } from './../../classes/breakpoint-subscriber.class';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import {
//   BreakpointObserver,
//   Breakpoints,
//   BreakpointState
// } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  // IMPORTANT make sure to call .unsubscribe() in ngOnDestroy
  // to prevent memory leaks!
  // private breakpointSubscriber: BreakpointSubscriber;

  constructor(
    // private breakpointObserver: BreakpointObserver
  ) {
    // IMPORTANT make sure to call .unsubscribe() in ngOnDestroy
    // to prevent memory leaks!
    // this.breakpointSubscriber = new BreakpointSubscriber(
    //   this.breakpointObserver
    // );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.breakpointSubscriber.unsubscribe();
  }
}
