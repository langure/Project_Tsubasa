import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackendLinkService } from '../backend-link.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // create a formcontrol for the email
  email = new FormControl('', [Validators.email, Validators.required]);

  constructor(
    private _backendLinkService: BackendLinkService,
    private _afAuth: AngularFireAuth,
    private _toastr: ToastrService,
    private _location: Location) {


    // set a defatult email
    this.email.setValue("weirdo261@gmail.com");

  }// constructor

  onSubmit() {
    console.log("onSubmit called");
    const true_url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/home";

    const email = this.email.value;
    const actionCodeSettings = {
      url: true_url,
      handleCodeInApp: true
    };

    if (email) {
      this._afAuth.sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        this._toastr.success('Check your inbox for the access link.', 'Link sent!', {
          positionClass: 'toast-bottom-center'
        });
      }).catch((error) => {
        console.log(error);
        this._toastr.error('An error occurred. Try again later.', 'Toast Message', {
          positionClass: 'toast-bottom-center'
        });
      });
    } // if email is valid
  }

}// class
