import { Component, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy, OnInit {

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {

    // Respond to nav-bar changes by scrolling to the proper section.
    // Keep track of subscription by pushing to subscriptions array.
    this.subscriptions.push(
      // subscribe to the state of the url fragment
      this.route.fragment.subscribe(
        // only call scrollToSection if fragment is defined
        fragment => {if (fragment) { this.scrollToSection(fragment); }}
      )
    );
  }

  /**
   * Selects one of the page's sections and scrolls to it.
   */
  private scrollToSection( sectionFragment: string ): void {

    // get section's root element reference
    const section = this.renderer.selectRootElement(
      '#' + sectionFragment, true
    );

    // Assume that it's an Element, then scroll into view.
    (section as Element).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  ngOnDestroy(): void {
    // prevent memory leaks
    this.unsubscribeAll();
  }

  /**
   * Unsubscribe from all subscriptions lest there be memory leaks.
   */
  private unsubscribeAll(): void {
    for ( const sub of this.subscriptions ) {
      sub.unsubscribe();
    }
  }
}
