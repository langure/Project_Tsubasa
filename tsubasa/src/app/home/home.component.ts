import { Component } from '@angular/core';
import { BackendLinkService } from '../backend-link.service';
import { Person } from '../interfaces/person.interface';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  person: Person = {
    name: "",
    email: "",
    first_time: true
  };

  // create a mew fpromcontrol for the name
  name = new FormControl('', [Validators.required]);

  // add the constructor
  constructor(
    private _backend_service: BackendLinkService
  ) { }

  ngOnInit(): void {

    // get the email from local storage
    const email = window.localStorage.getItem('emailForSignIn');
    console.log("Email: " + email);

    this._backend_service.get_person().subscribe((result) => {
      console.log(result);
      this.person = result[0];
      console.log("obtained person: ");
      console.log(this.person);
    });

  }// init

}
