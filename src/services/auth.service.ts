import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false; // Make this private or public based on your use case

  constructor() {}

  checkLogIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated = true;  // You might also want to verify the token's validity here
    } else {
      this.isAuthenticated = false;
    }
    console.log('Check login: ', this.isAuthenticated);
    return this.isAuthenticated;
  }
  

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    window.location.reload();
  }

  getCurrentUser() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      return JSON.parse(user);  // Return user data if it exists
    }
    return null;  // Return null if no user data exists
  }
  
  

  storeUser(user: any): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }
}
