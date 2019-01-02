import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-login-button',
  templateUrl: './user-login-button.component.html',
  styleUrls: ['./user-login-button.component.css']
})
export class UserLoginButtonComponent {

  private emails: string[] = [];

  constructor(
    private authService: AuthService
  ) {}

  async signInWithEmailAndPassword( email: string, password: string ) {

    const succeeded: boolean = await this.authService.signInWithEmailAndPassword(
      email, password
    );

    if ( succeeded ) {
      this.emails.push( email );
    } else {
      this.emails.push('ERROR');
    }
  }
}
