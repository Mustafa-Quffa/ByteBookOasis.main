import { Component } from '@angular/core';
import { MockAuthService } from '@services/mock-auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[RouterModule],
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: MockAuthService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe((response: { success: any; message: string; }) => {
      if (response.success) {
        this.message = 'Login successful!';
        // Handle successful login, e.g., navigate to another page
      } else {
        this.message = response.message;
      }
    });
  }
}
