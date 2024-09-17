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
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private signupService: SignupService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      first_name: [
        '', 
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')] // Only letters allowed
      ],
      last_name: [
        '', 
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')] // Only letters allowed
      ],
      user_name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      nationality_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
        this.nationalities = data.map(nationality => ({
          id: nationality.id, // Use ID as value
          name: nationality.title // Use name for display
        }));
      },
      error: (error) => {
        console.error('Error fetching nationalities', error);
      }
    });
  }
  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('Form data:', formData);
  
      this.signupService.signup(formData).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.successMessage = 'Signup successful!';
          this.errorMessage = null;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error', error);
          this.successMessage = null;
          this.errorMessage = 'Signup failed. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
  
}
