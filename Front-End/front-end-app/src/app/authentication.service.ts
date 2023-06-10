import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IUserState from 'src/app/IUser.interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUserState: BehaviorSubject<IUserState> = new BehaviorSubject({
    accessToken: '',
    _id: '',
    email: '',
    name: '',
    role: '',
  });
  getUserStates$ = this.currentUserState.asObservable();
  setUserState(newState: IUserState) {
    this.currentUserState.next(newState);
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(user: { email: string; password: string }) {
    return this.http.post<{ success: boolean; results: string }>(
      'http://localhost:3000/api/users/login',
      user
    );
  }
  signup(user: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    return this.http.post<{ success: boolean; results: string }>(
      'http://localhost:3000/api/users/signup',
      user
    );
  }

  logout() {
    this.setUserState({
      accessToken: '',
      _id: '',
      email: '',
      name: '',
      role: '',
    });
     localStorage.removeItem('currentUser');
    
  }
}
