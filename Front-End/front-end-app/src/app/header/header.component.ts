import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import IUserState from 'src/app/IUser.interface';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentUser: IUserState = {
    _id: '',
    accessToken: '',
    email: '',
    name: '',
    role: '',
  };
  router = inject(Router);
  authService = inject(AuthenticationService);
  constructor() {
    this.authService.getUserStates$.subscribe((response) => {
      this.currentUser = response;
    });
  }

  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    if (user) this.currentUser = JSON.parse(user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
