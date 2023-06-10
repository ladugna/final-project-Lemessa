import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import {  Router } from '@angular/router';
import IUserState from 'src/app/IUser.interface';
import JWT from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authService = inject(AuthenticationService);
  router = inject(Router);
  email: string = '';
  password: string = '';

  login() {
    console.log({
      email: this.email,
      password: this.password,
    });
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe((response) => {
        if (response.success) {
          const decoded: IUserState = JWT(response.results);
          this.authService.setUserState({
            ...decoded,
            accessToken: response.results,
          });
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              ...decoded,
              accessToken: response.results,
            })
          );
          this.router.navigate(['/'], { skipLocationChange: true });
        }
      });
  }
  signupOnClick() {
    this.router.navigate(['', 'signup']);
  }
}
