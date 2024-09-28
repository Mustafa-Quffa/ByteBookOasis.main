import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileDropdownComponent } from 'app/profile-dropdown/profile-dropdown.component';
import { LoginService } from 'app/login/login.service';
import { AuthService } from '@services/auth.service';

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
  userInfo: any

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.checkLogIn();
  }

  checkLogIn(): void {
    this.userInfo = localStorage.getItem('token')
   console.log('xt',this.userInfo)
   if(this.userInfo)
    this.isAuthenticated = true;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
   
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
