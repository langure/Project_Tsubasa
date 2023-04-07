import { Injectable } from '@angular/core';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, signInWithCustomToken } from "firebase/auth";
import { environment } from '../environments/environment';
import { initializeApp } from "firebase/app";
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class BackendLinkService {

  userData: any; // Save logged in user data

  constructor(private _afAuth: AngularFireAuth) {

    this._afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

  }

  /**
   * This method is called from the app-routing.module.ts file to check if the user is authenticated
   * First try to check if the user is coming from the email link. If so, sign in with the email link.
   * Else, check if the user data is in local storage. If so, the user is authenticated.
   * 
   * @returns true if the user is authenticated, false otherwise
   */
  async check_for_auth(): Promise<boolean> {
    const app = initializeApp(environment.firebase);
    const auth = getAuth(app);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      if (email) {
        try {
          const userCredentials = await signInWithEmailLink(auth, email, window.location.href);
          const idToken = await userCredentials.user.getIdToken(true);
          window.localStorage.setItem('session_token', idToken);
          console.log("Result from signInWithEmailLink: " + userCredentials);
          return true;
        } catch (error) {
          console.log("Error from signInWithEmailLink: " + error);
          window.localStorage.removeItem('session_token');
          return false;
        }
      }// if email correct
    }// if sign in with email link
    // if this was not a sign in with email link, check for user data in local storage
    // this data is refreshed / destroyed by the authState subscription in the constructor
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;

  }
}
