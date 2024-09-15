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
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.logInService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Handle successful login, e.g., store tokens, redirect, etc.
          this.router.navigate(['/']); // Adjust the route as necessary
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle error, e.g., show an error message
        }
      });
    }
  }
}
