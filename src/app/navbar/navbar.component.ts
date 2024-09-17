import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileDropdownComponent } from 'app/profile-dropdown/profile-dropdown.component';
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule, 
    NgOptimizedImage, 
    CommonModule, 
    FontAwesomeModule, 
    ProfileDropdownComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  faBookOpen = faBookOpen;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout(): void {
    this.loginService.logout();
    this.isAuthenticated = false;
    // Optionally redirect or perform other actions after logout
  }

  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  scrollToBottom(): void {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }
}
