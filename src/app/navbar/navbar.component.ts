import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileDropdownComponent } from 'app/profile-dropdown/profile-dropdown.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage,CommonModule,FontAwesomeModule,ProfileDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  menuActive: boolean = false;
  faBookOpen = faBookOpen;


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