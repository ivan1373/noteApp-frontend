import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: any;
  loading = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private as: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [
        Validators.required
      ]]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  toRegister() {
    this.router.navigate(['/register']);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginUser()
  {
        //console.log(this.f.email.value, this.f.password.value);
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
  
        this.as.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    this.loading = false;
                });
  }

}
