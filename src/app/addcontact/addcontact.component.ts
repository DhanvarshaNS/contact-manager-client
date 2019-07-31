import { Component, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { RequestService } from '../request.service';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss']
})
export class AddcontactComponent implements OnInit {
  constructor(private request: RequestService) {
    this.createFormController();
  }
  
  public name: any;
  public email: any;
  public city: any;
  public phoneno: any;
 
  private users: any;
  createFormController() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.email);
    this.phoneno = new FormControl('', Validators.maxLength(10));
    this.city = new FormControl('', [Validators.minLength(4), Validators.maxLength(6)]);

  }
  addcontact() {
    const newUserInfo = {
      name: this.name.value,
      email: this.email.value,
      phoneno: this.phoneno.value,
      city: this.city.value,
    };
    this.request.addNewUser(newUserInfo).subscribe(res => {
    console.log(res);
    }, (err) => {
      console.log(err);
    });
    console.log(newUserInfo);
  }
  ngOnInit() {
  }
 getErrorMessage(input: string) {
  switch (input) {
    case 'name':
      return this.name.hasError('required') ? 'You must enter a value' : '';
    case 'email':
      return this.email.hasError('required') ? 'You must enter a email' : this.email.hasError('email') ? 'Not a valid email' : '';
    case 'phoneno':
      return this.phoneno.hasError('required') ? 'You must enter a value' : '';
    case 'city':
      return this.city.hasError('required') ? 'You must enter a value' : '';

  }
 }
 }