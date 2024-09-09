import { Component } from '@angular/core';
import { MockAuthService } from '@services/mock-auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone:true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  
  imports:[FontAwesomeModule,RouterModule]
})
export class SignupComponent {

  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: MockAuthService) { }

  signup() {
    this.authService.signup(this.username, this.password).subscribe(response => {
      this.message = response.message;
      if (response.success) {
        // Handle successful signup, e.g., navigate to login page
      }
    });
  }
}
