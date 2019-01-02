import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private firebase_auth: AngularFireAuth ) {

    console.log('console.log is working!');

    this.isLoggedIn().then(( isLoggedIn: boolean ) => {

      console.log(`user is logged in: ${ isLoggedIn }`);
    });
  }

  /**
   * @returns a promise with the current user (firebase.User interface)
   *  or -if nobody is logged in- null.
   */
  async getCurrentUser(): Promise<firebase.User|null>  {

    for ( let i = 1; i <= 3; i++ )
    {
      console.log(`
        user is equivalent to authState:
        ${(await this.firebase_auth.user.pipe( first() ).toPromise())
        === (await this.firebase_auth.authState.pipe( first() ).toPromise())}
      `);
    }

    console.log( await this.firebase_auth.user.pipe( first() ).toPromise() );

    return this.firebase_auth.user.pipe( first() ).toPromise();
  }

  async isLoggedIn(): Promise<boolean> {
    // user is logged in if currentUser != null
    return null !== await this.getCurrentUser();
  }

  /**
   * Note: if function is successful
   * (i.e. if function returns a Promise holding true),
   * then the page refreshes, so there's no point in
   * hoping for the promise to resolve to true.
   * @returns promise containing boolean indicating
   * success or failure for the functiion.
   */
  async signInWithEmailAndPassword( email: string, password: string ) {

    return new Promise<boolean>(( resolve ) => {

      this.firebase_auth.auth.signInWithEmailAndPassword(
        email, password
      )
      .then(() => {
        // There's no point in returning the promise.
        // The website refreshes immediately after a successful sign-in,
        // so .then() never gets executed
        resolve( true );
      })
      .catch(( error ) => {
        
        console.log( error );

        resolve( false );
      });
    });
  }
}
