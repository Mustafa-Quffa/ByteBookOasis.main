import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css'
})
export class ProfileDropdownComponent {

  faUserEdit = faUserEdit;
  faSignOutAlt = faSignOutAlt;
  isAuthenticated: boolean = false;
  dropdownOpen = false;
  user = {
    user_name: '',
    email: '',
    first_name: '',
    last_name: '',
  };

  constructor(private authService: AuthService, private router: Router) {
    this.checkLogIn();  // Check login status when the component is initialized
  }

  ngOnInit(): void {
    // No need to call checkLogIn here, as it's already called in the constructor
  }

  toggleDropdown(event: Event) {
    // Prevent the click from propagating to the document
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const clickedInside = document.getElementById('dropdownUserAvatarButton')?.contains(event.target as Node) ||
                          document.getElementById('dropdownAvatar')?.contains(event.target as Node);

    if (!clickedInside) {
      this.dropdownOpen = false;  // Close the dropdown if the click is outside
    }
  }

  checkLogIn(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated = true;
      // Fetch user data from localStorage (or use another method to get user details)
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

      if (loggedInUser) {
        this.user.first_name = loggedInUser.first_name;
        this.user.last_name = loggedInUser.last_name;
        this.user.user_name = loggedInUser.user_name;
        this.user.email = loggedInUser.email;
      } else {
        this.isAuthenticated = false; // If user data is not found, logout
      }
    } else {
      this.isAuthenticated = false;  // No token means the user is not authenticated
    }
  }

  logout(): void {
    // Clear local storage and logout the user
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    this.isAuthenticated = false; // Update auth status
    window.location.reload();  // Forces a full page reload
    this.router.navigate(['/login']);  // Redirect to login page
  }
}
