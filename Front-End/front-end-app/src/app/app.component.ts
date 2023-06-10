import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import IUserState from 'src/app/IUser.interface';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Real State App';

  userServices = inject(AuthenticationService);
  router = inject(Router);
  userState!: IUserState;
  constructor() {
    this.userServices.getUserStates$.subscribe((response) => {
      this.userState = response;
    });
  }
  logout() {
    this.userServices.setUserState({
      accessToken: '',
      _id: '',
      email: '',
      name: '',
      role: '',
    });
    localStorage.removeItem('USER_STATE');
    this.router.navigate(['']);
  }
}
