import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth.service';



@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css'
})
export class ProfileDropdownComponent {
  isAuthenticated: boolean = false;
  dropdownOpen = false;
  user = {
    name: '',
    email: ''
  };


  constructor(private authService:AuthService,private router: Router) {
    this.isAuthenticated = this.authService.checkLogIn();
  }

  

  ngOnInit(): void {
    // Check if the user is authenticated (e.g., check if there's a token in localStorage)
    this.checkLogIn();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  checkLogIn(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated = true;
      
      // Fetch user data from localStorage (replace with actual data source if necessary)
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      this.user.name = loggedInUser.name || 'Default Name';
      this.user.email = loggedInUser.email || 'default@example.com';
    } else {
      this.isAuthenticated = false;
    }
  }


  logout(): void {
     // Clear local storage or any other logout functionality
     localStorage.removeItem('token');
     localStorage.removeItem('loggedInUser');
     window.location.reload(); // Forces a full page reload
     this.isAuthenticated = false;
     this.router.navigate(['/login']);
  }
}
