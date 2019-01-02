import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;

  constructor(
    private firebase_auth: AngularFireAuth
  ) {
    this.user = firebase_auth.authState;
  }


  signInWithEmailAndPassword( email: string, password: string ) {
    return this.firebase_auth.auth.signInWithEmailAndPassword(
      email, password
    );
  }
}
