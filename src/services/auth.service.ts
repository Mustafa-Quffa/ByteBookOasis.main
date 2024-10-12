import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
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

  getCurrentUser() {
    // Retrieve user data from localStorage or similar
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null; // Parse and return user or null if no user
  }

  // Example method for storing user info (like after login)
  storeUser(user: any): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }
}
