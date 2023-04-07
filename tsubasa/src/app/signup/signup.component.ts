import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { passwordValidator } from '../password.validator';
import { BackendLinkService } from '../backend-link.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // Create a form group and three form controls name, email, and password
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('')
  });

  constructor(
    private _backendLinkService: BackendLinkService,
    private _afAuth: AngularFireAuth) {

  }

  onSubmit() {
    const email = this.signupForm.get('email')?.value;

    // This must be obtained from the environment file
    const actionCodeSettings = {
      url: 'http://localhost:4200/home',
      handleCodeInApp: true
    };
    if (email) {
      this._afAuth.sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        console.log('Email sent');
      }).catch((error) => {
        console.log(error);
      });
    } // if email is valid


  }// on submit

}// class
