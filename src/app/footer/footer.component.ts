import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faTwitter, faInstagram,faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports:[CommonModule,FontAwesomeModule]
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebook;
  faTwitter =  faTwitter;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  showFooter = false;
  private hiddenRoutes = ['/login', '/signup'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateFooterVisibility();
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.checkScroll();
  }

  checkScroll(): void {
    const scrollTop = window.scrollY || window.pageYOffset;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      this.showFooter = true;
    } else {
      this.showFooter = false;
    }
  }

  updateFooterVisibility(): void {
    const currentUrl = this.router.url;
    if (['/forgot-password','/login', '/signup','/reset-password','reset-password/:token'].includes(currentUrl)) {
      this.showFooter = false;
    } else {
      this.checkScroll();
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
