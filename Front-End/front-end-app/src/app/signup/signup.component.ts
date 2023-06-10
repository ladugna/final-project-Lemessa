import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  title = 'Sign Up Form';
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  signup() {
    console.log({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    });
    
    this.authService
      .signup({
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      })
      .subscribe((response) => {
        this.router.navigate(['login']);
      });
  }
}
