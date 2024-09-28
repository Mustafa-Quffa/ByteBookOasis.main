import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;  // Define the form group
  successMessage: string = '';
  errorMessage: string = '';
  token: string = '';
  apiUrl: string = 'http://localhost:3000/user/reset-password';  // Your backend API

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form group with a password field and validation
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // Get the reset token from the URL
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    const url = `${this.apiUrl}/${this.token}`; // Construct URL with token
    const newPassword = this.resetPasswordForm.get('newPassword')?.value; // Get new password from form

    this.http.post(url, { newPassword })
      .subscribe({
        next: (response: any) => {
          this.successMessage = 'Password has been reset successfully. You can now log in.';
          this.errorMessage = ''; // Clear any previous error message
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to login after 2 seconds
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Error resetting password. Please try again later.'; // Display error message
          this.successMessage = ''; // Clear any previous success message
        },
      });
  }
}
