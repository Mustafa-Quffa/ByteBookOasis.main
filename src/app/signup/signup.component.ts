import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { SignupService } from './signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FontAwesomeModule, RouterModule, ReactiveFormsModule, CommonModule],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  nationalities: any;

  constructor(
    private signupService: SignupService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      nationality_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadNationalities();
  }

  loadNationalities() {
    this.signupService.getNationalities().subscribe({
      next: (data) => {
        console.log('Nationalities data:', data);
        this.nationalities = data.map(nationality => nationality.title); // Adjust according to response
      },
      error: (error) => {
        console.error('Error fetching nationalities', error);
      }
    });
  
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error', error);
        },
        complete: () => {
          // Optionally handle completion if needed
        }
      });
    }
}
}
