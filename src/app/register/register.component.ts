import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private as: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  registerUser() {
    console.log(this.registerForm.value);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    	}

    this.as.register(this.registerForm.value)
      .subscribe(
          data => {
              //this.alertService.success('Registration successful', true);
              console.log('success!')
              this.router.navigate(['/login']);
          },
          error => {
              //this.alertService.error(error);
              console.log('success! ...not!')
          });
  }

}
