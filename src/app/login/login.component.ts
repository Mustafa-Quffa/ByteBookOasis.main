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
    private router: Router,
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
          
          const loginInfo = {
            email: response.email,
            first_name: response.first_name,
            last_name: response.last_name,
            age: response.age,
            user_name: response.user_name,
            nationality: response.nationality,
            role: response.role,
            member_since: response.member_since,
          }

          localStorage.setItem('loggedInUser', JSON.stringify(loginInfo));
          localStorage.setItem('token', response.token)
          this.successMessage = 'Login successful!';
          this.errorMessage = null;
          // this.logInService.setAuthenticationStatus(true);
          this.router.navigate(['/home']).then(() => {
            // Reload the page after navigation
            window.location.reload();
          });
          // Navigate to the home or dashboard page after successful login
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

  ngOnInit(): void {}
    
}
