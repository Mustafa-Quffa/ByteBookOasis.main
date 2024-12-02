import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service'; // Adjust the path as necessary
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '..//..//services/auth.service'; // Add AuthService

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
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Handle the form submission and login
  onSubmit(): void {
    if (this.loginForm.valid) {  // Ensure the form is valid
      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
  
          const loginInfo = {
            id: response.id,         // Store the user id
            email: response.email,   // Store other user info
            user_name: response.user_name,
            role: response.role,
            nationality: response.nationality,
            first_name: response.first_name,
            last_name: response.last_name,
            age: response.age,
            member_since: response.member_since,
            token: response.token,   // Store the JWT token
            // Add any other properties you need here
          };
          
          // Store the user data and token in localStorage
          localStorage.setItem('loggedInUser', JSON.stringify(loginInfo));
          localStorage.setItem('token', response.token);  // Store the token separately
          
          
          // Store the user data in localStorage
          localStorage.setItem('loggedInUser', JSON.stringify(loginInfo));
          
  
          localStorage.setItem('loggedInUser', JSON.stringify(loginInfo));
          localStorage.setItem('token', response.token);
          this.successMessage = 'Login successful!';
          this.errorMessage = null;
  
          // Navigate based on user role
          if (response.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.error('Login error', error);
          this.successMessage = null;
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
  

  ngOnInit(): void {}
}
