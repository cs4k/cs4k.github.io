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
import { TeamComponent } from './components/team/team.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { VolunteerPageComponent } from './components/volunteer-page/volunteer-page.component';
import { FeaturedVolunteersComponent } from './components/featured-volunteers/featured-volunteers.component';
import { PhotosComponent } from './components/photos/photos.component';
import { NewsComponent } from './components/news/news.component';
import { SchoolContactComponent } from './components/school-contact/school-contact.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    PhotosComponent,
    TeamComponent,
    FaqComponent,
    ContactUsComponent,
    AboutUsComponent,
    VolunteerPageComponent,
    FeaturedVolunteersComponent,
    NewsComponent,
    SchoolContactComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
