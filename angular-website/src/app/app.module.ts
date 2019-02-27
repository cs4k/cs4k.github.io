import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// required for AngularFire2
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
// optional AngularFire2 modules for specific needs
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireFunctionsModule } from '@angular/fire/functions';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';

// Angular Material Modules
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LayoutModule } from '@angular/cdk/layout';
// import { MatSidenavModule } from '@angular/material/sidenav';

// ng-bootstrap module and widgets
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './services/auth.service';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BreakpointReactDirective } from './directives/breakpoint-react.directive';
import { TeamComponent } from './components/team/team.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    BreakpointReactDirective,
    TeamComponent,
    FaqComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Firebase modules
    AngularFireModule.initializeApp(
      environment.firebase,
      // app name
      'angular-website'
    ),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // AngularFireFunctionsModule,
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireMessagingModule

    // Angular Material modules
    // BrowserAnimationsModule,
    // LayoutModule,
    // MatSidenavModule

    // ng-bootstrap modules
    // NgbModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
