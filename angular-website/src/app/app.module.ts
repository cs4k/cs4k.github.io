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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
// ng-bootstrap widgets
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    HeaderComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

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

    BrowserAnimationsModule,
    LayoutModule,
    MatSidenavModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
