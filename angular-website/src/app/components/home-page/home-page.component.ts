import { Component, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy, OnInit {

  private subscriptions: Subscription[] = [];

  // delete when done
  data = {
    name: 'Michael Jordan',
    bio: 'Former baseball player',
    image: '/assets/logo.png'
  };

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private title: Title,
    private meta: Meta
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

    // delete when done
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/home' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio },
      { name: 'og:image', content: this.data.image }
    ]);
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
