import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private firebaseAuth: AngularFireAuth ) {

    console.log(`user is logged in: ${ this.isLoggedIn() }`);

    this.firebaseAuth.auth.onAuthStateChanged(
      ( user: firebase.User | null ) => {

        console.log( user );
        console.log(`user is logged in: ${ this.isLoggedIn() }`);
      },
      ( error: firebase.auth.Error ) => {

        console.log( error );
        console.log(`user is logged in: ${ this.isLoggedIn() }`);
      }
    );
  }

  /**
   * @returns a promise with the current user (firebase.User interface)
   *  or -if nobody is logged in- null.
   */
  getCurrentUser(): firebase.User | null {
    return this.firebaseAuth.auth.currentUser;
  }

  isLoggedIn(): boolean {
    // user is logged in if currentUser !== null
    return null !== this.getCurrentUser();
  }

  /**
   * Note: if function is successful
   * (i.e. if function returns a Promise holding true),
   * then the page refreshes, so there's no point in
   * hoping for the promise to resolve to true.
   * @returns success/failure of sign-in
   */
  async signInWithEmailAndPassword(
    email: string, password: string
  )
  : Promise<boolean> {

    return new Promise<boolean>(( resolve ) => {

      this.firebaseAuth.auth.signInWithEmailAndPassword(
        email, password
      )
      .then(( user_cred: firebase.auth.UserCredential ) => {

        // debugging
        console.log( JSON.stringify(user_cred) );

        resolve( true );
      })
      .catch(( error ) => {

        // debugging
        console.log( error );

        resolve( false );
      });
    });
  }
}
