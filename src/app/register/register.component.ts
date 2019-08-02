import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit { 
  
  constructor(private request: RequestService,
    private router: Router) {
    this.createFormController();
  }
  
  public username: any;
  public password: any;
 
  private users: any;
  createFormController() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

  }
  register() {
    const body = {
      username: this.username.value,
      password: this.password.value,
    };
    this.request.register(body).subscribe(res => {
    console.log(res);
    this.router.navigate(['login']);
    }, (err) => {
      alert(err);
      this.router.navigate(['register']);
    });
    console.log(body);
  }
  ngOnInit() {
  }
  //getErrorMessage(input) {
    //switch (input) {
     // case 'username':
      //  return this.username.hasError('required') ? 'You must enter a value' : '';
      //case 'password':
       // return this.password.hasError('required') ? 'You must enter a value' : '';
  
    //}
  // }

}
