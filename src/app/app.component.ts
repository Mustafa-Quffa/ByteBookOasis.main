import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,CommonModule,ProfileDropdownComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ByteBookOasis';
  showFooter: boolean = true;
  showNavbarAndFooter = true; // Variable to control visibility


  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFooter = !['/login', '/signup'].includes(this.router.url);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Update the visibility based on the route
        this.showNavbarAndFooter = !event.url.startsWith('/admin'); // Change '/admin' to your actual admin route
      }
    });
  }

}