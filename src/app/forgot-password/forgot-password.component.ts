import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink,FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3000/user/password-reset', { email: this.email })
      .subscribe({
        next: (response: any) => {
          // Show success message
          this.successMessage = 'Password reset link has been sent to your email.';
        },
        error: (error) => {
          // Show error message
          this.errorMessage = 'Error sending reset link. Please try again later.';
        },
      });
  }
}
