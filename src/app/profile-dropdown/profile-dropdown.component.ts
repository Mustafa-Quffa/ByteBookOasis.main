import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css'
})
export class ProfileDropdownComponent {
  dropdownOpen = false;
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  constructor(private router: Router) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    // Handle logout logic
    this.router.navigate(['/login']);
  }
}
