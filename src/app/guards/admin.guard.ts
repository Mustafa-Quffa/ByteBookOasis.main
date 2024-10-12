import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private currentUser: any; // or use a User type
  constructor(private authService: AuthService, private router: Router) {

     // Assume you store user info in local storage
     const user = localStorage.getItem('currentUser');
     this.currentUser = user ? JSON.parse(user) : null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    console.log('Current User:', user); // Log user info
    if (user && user.role === 'admin') {
      return true;
    }
    this.router.navigate(['/login']); // Redirect to login if not admin
    return false;
  }
}
