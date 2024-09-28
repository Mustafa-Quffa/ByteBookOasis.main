import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor() {}

  checkLogIn(): boolean {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    window.location.reload();
  }
}
