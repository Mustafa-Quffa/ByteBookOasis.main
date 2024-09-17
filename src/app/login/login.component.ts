import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service'; // Adjust the path as necessary
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule, ReactiveFormsModule, CommonModule] 
})
export class LoginComponent {
  
  loginForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private logInService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {  // Ensure the form is valid
      this.logInService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.successMessage = 'Login successful!';  // Set success message
          this.errorMessage = null;  // Clear any previous error message
          
          // Navigate to the home or dashboard page after successful login
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login error', error);
          this.successMessage = null;  // Clear any previous success message
          this.errorMessage = 'Login failed. Please check your credentials and try again.';  // Set error message
        },
        complete: () => {
          // Optionally handle completion if needed
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';  // Set error if the form is invalid
    }
  }
}
