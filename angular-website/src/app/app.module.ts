import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

import { AuthService } from './services/auth.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
