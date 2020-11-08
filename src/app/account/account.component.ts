import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }

  form: FormGroup;
  hide = true;

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      age: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      city: new FormControl(),
      country: new FormControl()
    });
  }

  onSubmit(accountItem) {
    console.log(accountItem);
  }

}
